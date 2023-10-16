import {db} from "@/app/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";
import {getServerSession} from "next-auth";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Cards from "@/app/components/Cards";
import {redirect} from "next/navigation";

async function getUserSwipesAndCheckFields(email){
    const usersCollection = collection(db, "users");

    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    let accounts = [];
    let hasMissingField = false;

    if (querySnapshot.size > 0) {
        await querySnapshot.forEach((doc) => {
            const data = doc.data();
            accounts = data.swipedAccounts;

            // Check for missing fields
            const requiredFields = ["image", "age", "name", "gender", "home", "university", "major", "bio", "hobbies", "profilePic"];
            for (const field of requiredFields) {
                if (!data[field]) {
                    hasMissingField = true;
                    break;
                }
            }
        });

        return { accounts, hasMissingField };
    }
}


export default async function Matches(){

    const session = await getServerSession();
    if(!session){
        redirect('/signin');
    }
    const email = session?.user?.email;

    const user = [];

    const id = []

    let loading = true;

    const response = await getUserSwipesAndCheckFields(email);

    const swipedAccounts = response.accounts

    const check = response.hasMissingField

    if(check){
        redirect("/form");
    }

    const querySnapshot = await getDocs(collection(db, "users"));
    await querySnapshot.forEach((doc) => {
        const data = doc.data();
        if(!swipedAccounts?.includes(data.email) && data.email !== email) {
            user.push(data);
            id.push(doc.id);
        }
    }
    );
    loading = false;

    return (
        <div className={"h-[90svh] md:h-[90svh] w-[100svw] flex flex-col items-center gap-y-2 overflow-hidden"}>
            <div className={"hidden md:block pt-2 absolute z-50 text-xl font-semibold md:font-normal md:text-3xl"}>Connections</div>
            {loading ? <LoadingSpinner /> : <Cards user={user} userIds={id}/>}
        </div>
    )
}