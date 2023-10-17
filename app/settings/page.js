import SignoutButton from "@/app/settings/SignoutButton";
import Link from "next/link";
import SettingsToggles from "@/app/settings/SettingsToggles";
import {getServerSession} from "next-auth";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import {redirect} from "next/navigation";

async function getUserByEmail(email){
    let user = null;
    const usersCollection = collection(db, "users")

    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    if(querySnapshot.size > 0){
        await querySnapshot.forEach((doc) => {
            user = doc.data();
        });
    }
    return user;
}


export default async function SettingsPage(){

    const session = await getServerSession();

    if(!session){
        redirect('/signin');
    }

    const user = await getUserByEmail(session.user.email);

    return (
        <div className={"flex flex-col space-y-8 h-[90svh] w-[100svw] flex justify-center items-center"}>
            <div className={"flex flex-col items-center space-y-4"}>
                <div className={"text-4xl"}>Edit</div>
                <div className={"flex space-x-4"}>
                    <Link href={"/form"}><div className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Personal Info</div></Link>
                    <Link href={"/form"}><div className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Images</div></Link>
                    <Link href={"/form"}><div className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Profile Picture</div></Link>
                    <Link href={"/form"}><div className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Biography</div></Link>
                </div>
            </div>
            <SettingsToggles user={user}/>
            <SignoutButton />
        </div>
    )
}