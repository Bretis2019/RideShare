import {NextResponse} from "next/server";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "@/app/firebase";
import {collection, getDocs, query, updateDoc, where} from "firebase/firestore";
import {getServerSession} from "next-auth";

export async function POST(request){
    const data = await request.formData();
    const image = data.get('image');
    const name = data.get('name');
    const session = await getServerSession();

    if(!image){
        return NextResponse.json({ status: 400, message: "Invalid image"});
    }


    const bytes = await image.arrayBuffer()
    const buffer= Buffer.from (bytes)

    try {
        const imageRef = ref(storage, `${name}`);
        await uploadBytes(imageRef, buffer);
        const url = await getDownloadURL(imageRef);

        const usersCollection = collection(db, "users")

        const q = query(usersCollection, where("email", "==", session.user.email));

        const querySnapshot = await getDocs(q);

        if(querySnapshot.size > 0){
            querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, {
                    profilePic: url
                })
            });
            return NextResponse.json({status: 200, message: "added image successfully"});
        }else{
            return NextResponse.json({status: 400, message: "Not authorized"});
        }
    }catch(e) {
        return NextResponse.json({status: 400, message: e.message});
    }
}