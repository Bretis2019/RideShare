import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import {getServerSession} from "next-auth";
import React from "react";
import Link from "next/link";
import {redirect} from "next/navigation";

const usersCollection = collection(db, "users")

async function getUserMatchesEmails(email){

    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    let accounts = [];

    if (querySnapshot.size > 0) {
        await querySnapshot.forEach((doc) => {
                const data = doc.data()
                accounts = data.matches;
            }
        );
        return accounts;
    }
}

async function getUsers(emails){

    let accounts = [];

    if(emails === undefined){return}

    for (const email of emails) {
        const q = query(usersCollection, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            await querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    accounts.push({data, id: doc.id});
                }
            );
        }
    }
    return accounts;
}

export default async function MatchesPage(){
    const session = await getServerSession();

    if(!session?.user){
        redirect("/signin")
    }

    const email = session.user.email;
    const matchesEmails = await getUserMatchesEmails(email);
    const accounts = await getUsers(matchesEmails);

    const elements = accounts?.map(data => {
        const item = data.data;
        return (
            <Link key={data.id} href={`/messages/${data.id}`}>
                <div className={"flex gap-x-8 rounded-xl border-2 border-white px-8 py-4"}>
                    <img className="h-16 w-16 rounded-full object-cover" src={item.image[0]} alt={item.name} />
                    <div className={"flex flex-col gap-y-4"}>
                        <div>{item.name}</div>
                        <div>{item.university.name}</div>
                    </div>
                </div>
            </Link>
        )
    });

    if(elements.length === 0){
        return (
            <div className={"h-[90svh] flex justify-center items-center text-2xl"}>No matches yet</div>
        )
    }

    return (
        <div className={"flex flex-col gap-y-2"}>
            {elements}
        </div>
    )
}