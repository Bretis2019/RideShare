import {arrayUnion, doc, getDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/app/firebase";
import {NextResponse} from "next/server";

async function createMessage(convoId, sender_id, text){
    const convo = doc(db, "convos", convoId)

    await updateDoc(convo, {
        messages: arrayUnion({
            sender_id: sender_id,
            text: text,
            created_at: new Date()
        })
    });

}

export async function POST(request){
    try {
        const {convoId, sender_id, text} = await request.json();

        await createMessage(convoId, sender_id, text)

        NextResponse.json({status : 200, message: "message created successfully"});
    }catch (err) {
        NextResponse.json({status : 400, message: `error creating message: ${err}`});
    }
}
