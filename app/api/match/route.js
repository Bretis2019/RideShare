import {getServerSession} from "next-auth";
import {arrayUnion, collection, getDocs, query, updateDoc, where, arrayRemove, addDoc} from "firebase/firestore";
import {db} from "@/app/firebase";
import {NextResponse} from "next/server";

const usersCollection = collection(db, "users")

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


async function checkMatch(email, userEmail) {
    try {
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            return querySnapshot.docs.some((doc) => {
                const data = doc.data();
                const matches = data.likedAccounts;
                if(!matches){
                    return false;
                }
                return matches.includes(userEmail);
            });
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}


async function updateAccount(email,userEmail,direction){
    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach(doc => {
        if(direction === "right"){
            updateDoc(doc.ref, {
                swipedAccounts: arrayUnion(userEmail),
                likedAccounts: arrayUnion(userEmail)
            })
        }else{
            updateDoc(doc.ref, {
                swipedAccounts: arrayUnion(userEmail),
            })
        }
    })
}

async function createMatch(email, userEmail){
    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach(doc => {
        updateDoc(doc.ref, {
            matches: arrayUnion(userEmail)
        })
    })
    await createConvo(email, userEmail)
}

async function createConvo(email, userEmail){
    const convosCollection = collection(db, "convos")

    const user_id1 = await getUserId(email);
    const user_id2 = await getUserId(userEmail);

    const data = {
        user_id1: user_id1,
        user_id2: user_id2
    }
    await addDoc(convosCollection, data);
}

async function removeSwipe(email, userEmail){
    const q = query(usersCollection, where("email", "==", email));

    const querySnapshot = await getDocs(q);

    await querySnapshot.forEach(doc => {
        updateDoc(doc.ref, {
            matches: arrayRemove(userEmail),
            swipedAccounts: arrayRemove(userEmail),
            likedAccounts: arrayRemove(userEmail)
        })
    })
}

export async function POST(request){

    const session = await getServerSession();
    const email = session.user.email;

    const {userEmail, direction} = await request.json();

    try{
        await updateAccount(email, userEmail, direction);
        const result = await checkMatch(userEmail, email);
        if(result){
            await createMatch(email, userEmail);
            await createMatch(userEmail, email);
            return NextResponse.json({status: 200, match: true})
        }
        else{
            return NextResponse.json({status: 200, match: false})
        }
    }catch(err){
        console.error('Error:', err);
        return NextResponse.json({status: 400, message: err.message});
    }
}

export async function DELETE(request){

    const session = await getServerSession();
    const email = session.user.email;

    const {userEmail} = await request.json();

    try{
        await removeSwipe(email, userEmail);
        return NextResponse.json({status: 200, message: "removed swipe successfully"});
    }catch(err){
        console.error('Error:', err);
        return NextResponse.json({status: 400, message: err.message});
    }
}