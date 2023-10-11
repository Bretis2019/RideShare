import {doc, getDoc} from "firebase/firestore";
import {db} from "@/app/firebase";
import EmblaCarousel from "@/app/profile/[id]/EmblaCarousel";
import './base.css'
import './embla.css'

async function getUserDetails(id){
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export default async function ProfilePage({ params} ){
    const id = params.id;

    const user = await getUserDetails(id);

    const OPTIONS = { containScroll: 'trimSnaps' }

    const SLIDES = user.image;

    return (
        <div className={"flex gap-x-8 rounded-xl"}>
            <div className={"w-[40svw] h-[80svh] select-none cursor-grab"}>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <div className={"flex flex-col gap-y-4 justify-center items-center w-[60svw]"}>
                <div>{user.name}</div>
                <div>{user.university.name}</div>
            </div>
        </div>
    )

}