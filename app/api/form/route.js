import {addDoc, collection, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export async function POST(request){
    const {name, university, home, major, age, gender} = await request.json();
    const session = await getServerSession();
    const email = session.user.email;

    if(!email || !name || !university || !home || !major || !age || !gender){
        return NextResponse.json({status: 400, message: "Missing credentials"});
    }

    try {
        const usersCollection = collection(db, "users")

        const q = query(usersCollection, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        if(querySnapshot.size > 0){
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    name: name,
                    university: university,
                    home: home,
                    major: major,
                    age: age,
                    gender: gender
                })
            });
            return NextResponse.json({status: 200, message: "user data updated successfully"})
        }
        else{
            await addDoc(usersCollection, {
                email: email,
                name: name,
                university: university,
                home: home,
                major: major,
                age: age,
                gender: gender
            })
            return NextResponse.json({status: 200, message: "user data created successfully"})
        }

    } catch (error) {
        return NextResponse.json({status: 400, message: `error submitting form : ${error}`})
    }
}