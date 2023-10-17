import {addDoc, collection, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export async function POST(request){
    const {oppositeGender, sameGender, sameUni, sameHome} = await request.json();
    const session = await getServerSession();
    const email = session.user.email;

    if(typeof oppositeGender === "undefined" || typeof sameGender === "undefined" || typeof sameUni === "undefined" || typeof sameHome === "undefined"){
        return NextResponse.json({status: 400, message: "Missing credentials"});
    }

    try {
        const usersCollection = collection(db, "users")

        const q = query(usersCollection, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if(querySnapshot.size > 0){
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    oppositeGender: oppositeGender,
                    sameGender: sameGender,
                    sameUni: sameUni,
                    sameHome: sameHome
                })
            });
            return NextResponse.json({status: 200, message: "user data updated successfully"})
        }else{
            return NextResponse.json({status: 400, message: "No user found"})
        }

    } catch (error) {
        return NextResponse.json({status: 400, message: `error submitting form : ${error}`})
    }
}