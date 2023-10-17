import SignoutButton from "@/app/settings/SignoutButton";
import Link from "next/link";
import SettingsToggles from "@/app/settings/SettingsToggles";
import {getServerSession} from "next-auth";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/app/firebase";

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

    const user = await getUserByEmail(session.user.email);

    return (
        <div className={"flex flex-col space-y-8"}>
            <div className={"flex flex-col space-y-4"}>
                <div>Edit</div>
                <div className={"flex space-x-4"}>
                    <Link href={"/form"}><div>Personal Info</div></Link>
                    <Link href={"/form"}><div>Images</div></Link>
                    <Link href={"/form"}><div>Profile Picture</div></Link>
                    <Link href={"/form"}><div>Biography</div></Link>
                </div>
            </div>
            <SettingsToggles user={user}/>
            <SignoutButton />
        </div>
    )
}