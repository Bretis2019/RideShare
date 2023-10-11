import {getServerSession} from "next-auth";
import {collection, doc, getDoc, getDocs, onSnapshot, query, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import TypeBar from "@/app/messages/[id]/TypeBar";
import React from "react";
import Messages from "@/app/messages/[id]/Messages";
import {redirect} from "next/navigation";

async function getUserId(email){
    const usersCollection = collection(db, "users")

    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    let id = ""

    await querySnapshot.forEach((doc) => {
            id = doc.id;
        }
    );
    return id;
}

async function getConvoId(id, loggedId){

    const convosCollection = collection(db, "convos")

    const q = query(convosCollection, where("user_id1", "in", [id, loggedId]), where("user_id2", "in", [id, loggedId]));

    const querySnapshot = await getDocs(q);

    let convoId = "";

    await querySnapshot.forEach((doc) => {
        convoId = doc.id;
        }
    );
    return convoId;
}

async function getUserDetails(id){
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export default async function MessagePage({params}) {

    const session = await getServerSession();
    if(!session?.user){
        redirect("/signin")
    }
    const email = session.user.email;


    const id = params.id
    const loggedId = await getUserId(email);

    const convoId = await getConvoId(id, loggedId);




    const user = await getUserDetails(id);


    return (
        <div className={"w-[100svw] h-[90svh] flex flex-col justify-between py-2"}>
            <div className={"flex gap-x-8 border-b-2 border-white px-8 pb-4"}>
                <img className="h-16 w-16 rounded-full object-cover" src={user.image[0]} alt={user.name} />
                <div className={"flex flex-col gap-y-4"}>
                    <div>{user.name}</div>
                    <div>{user.university.name}</div>
                </div>
            </div>
            <div className={"px-4 py-4 h-full w-full"}>
                <Messages convoId={convoId} id={id}/>
            </div>
            <TypeBar convoId={convoId} sender_id={loggedId}/>
        </div>
    )

}