"use client"

import {useState, useMemo, useRef, useEffect} from 'react'
import TinderCard from 'react-tinder-card'
import React from "react";
import "./Cards.css"
import {toast, Toaster} from "sonner";
import Link from "next/link";

function HouseSvg(){
    return (
        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="Navigation / House_01"> <path id="Vector" d="M20 17.0002V11.4522C20 10.9179 19.9995 10.6506 19.9346 10.4019C19.877 10.1816 19.7825 9.97307 19.6546 9.78464C19.5102 9.57201 19.3096 9.39569 18.9074 9.04383L14.1074 4.84383C13.3608 4.19054 12.9875 3.86406 12.5674 3.73982C12.1972 3.63035 11.8026 3.63035 11.4324 3.73982C11.0126 3.86397 10.6398 4.19014 9.89436 4.84244L5.09277 9.04383C4.69064 9.39569 4.49004 9.57201 4.3457 9.78464C4.21779 9.97307 4.12255 10.1816 4.06497 10.4019C4 10.6506 4 10.9179 4 11.4522V17.0002C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74432 19.6452 5.23438 19.8482C5.60192 20.0005 6.06786 20.0005 6.99974 20.0005C7.93163 20.0005 8.39808 20.0005 8.76562 19.8482C9.25568 19.6452 9.64467 19.2555 9.84766 18.7654C9.9999 18.3979 10 17.932 10 17.0001V16.0001C10 14.8955 10.8954 14.0001 12 14.0001C13.1046 14.0001 14 14.8955 14 16.0001V17.0001C14 17.932 14 18.3979 14.1522 18.7654C14.3552 19.2555 14.7443 19.6452 15.2344 19.8482C15.6019 20.0005 16.0679 20.0005 16.9997 20.0005C17.9316 20.0005 18.3981 20.0005 18.7656 19.8482C19.2557 19.6452 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0002Z" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g> </g></svg>
    )
}

export default function Cards(props){

    const {user, userIds} = props;

    const [currentIndex, setCurrentIndex] = useState(user.length - 1)
    const [lastDirection, setLastDirection] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.length > currentIndex + 1){
            const currentUser = user[currentIndex + 1];
            fetch("/api/match", {
                method: "POST",
                body: JSON.stringify({
                    userEmail: currentUser.email,
                    direction: lastDirection
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.match){
                        toast.success('Match !')
                    }
                })
        }
    }, [lastDirection, currentIndex]);

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
            Array(user.length)
                .fill(0)
                .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < user.length - 1

    const canSwipe = currentIndex >= 0
    
    const swiped = (direction, nameToDelete, index) => {
        setLastDirection(direction)
        updateCurrentIndex(index - 1)
    }

    const outOfFrame = (name, idx) => {
        // handle the case in which go back is pressed before card goes outOfFrame
        currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
        // TODO: when quickly swipe and restore multiple times the same card,
        // it happens multiple outOfFrame events are queued and the card disappear
        // during latest swipes. Only the last outOfFrame event should be considered valid
    }

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < user.length) {
            await childRefs[currentIndex].current.swipe(dir)
                .then(() => {
                    setLoading(false);
                })
        }
    }

    const goBack = async () => {
        if (!canGoBack) return
        setLoading(true);
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
        const currentUser = user[currentIndex + 1];
        fetch("/api/match", {
            method: "DELETE",
            body: JSON.stringify({
                userEmail: currentUser.email,
            })
        }).then(() => {
            setLoading(false);
        })

    }

    const elements = user.map((item, index) => (
        <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={item.email}
            onSwipe={(dir) => swiped(dir, item.name, index)}
            onCardLeftScreen={() => outOfFrame(item.name, index)}
        >
            <Link href={`/profile/${userIds[index]}`}>
                <div className="absolute select-none cursor-grab">
                    <img className="md:w-[25svw] md:h-[75svh] h-[90svh] w-[100svw] rounded-xl object-cover" src={item.image} alt={item.name} />
                    <div className="rounded-b-xl absolute inset-0 bg-gradient-to-t from-black from-[18%] md:from-[13%] to-transparent to-[60%]"></div>
                    <div className="absolute inset-0 flex flex-col items-start justify-end text-white p-4 md:w-[22svw] w-[95svw] gap-y-4">
                        <div className={"flex justify-between md:w-[20svw] w-[95svw] items-center px-2"}>
                            <h2 className="text-xl font-bold mb-2 self-center">{item.name}, {item.age}</h2>
                            <div className={"flex gap-x-1 items-center Card rounded-full px-2 h-fit"}>
                                <HouseSvg />
                                <p className="text-base">{item.home.name}</p>
                            </div>
                        </div>
                        <div className={"flex flex-col items-start gap-y-2 md:w-[20svw] w-[95svw] text-center mb-16 md:mb-0 px-2"}>
                            <p className="Card rounded-full px-2 py-1 text-sm">{item.university.name}</p>
                            <p className="Card rounded-full px-2 py-1  text-sm">{item.major.name}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </TinderCard>

    ));

    return (
        <div className={"flex flex-col gap-y-4 md:pt-16"}>
            <div className={"w-[100svw] md:w-[22svw]"}>
                <Toaster position="top-center" richColors theme={"dark"}/>
                {elements}
            </div>
            <div className={"absolute bottom-0 pb-[12svh] md:pb-0 w-[100svw] md:w-[30svw] md:block"}>
                <div className={"flex justify-between px-8 md:w-[22svw]"}>
                    <button className={`disabled:bg-red-800 p-2 rounded-full bg-red-400`} onClick={() => swipe('left')} disabled={loading}><svg width="35px" height="35px" className={"fill-red-900"} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M213.333 960c0-167.36 56-321.707 149.44-446.4L1406.4 1557.227c-124.693 93.44-279.04 149.44-446.4 149.44-411.627 0-746.667-335.04-746.667-746.667m1493.334 0c0 167.36-56 321.707-149.44 446.4L513.6 362.773c124.693-93.44 279.04-149.44 446.4-149.44 411.627 0 746.667 335.04 746.667 746.667M960 0C429.76 0 0 429.76 0 960s429.76 960 960 960 960-429.76 960-960S1490.24 0 960 0" fillRule="evenodd" /> </g></svg></button>
                    <button className={`${!canGoBack && 'hidden'} disabled:bg-blue-800 p-2 rounded-full bg-blue-400`} onClick={() => goBack()} disabled={loading}><svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10" className={"stroke-blue-900"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg></button>
                    <button className={`disabled:bg-green-800 p-2 rounded-full bg-green-400`} onClick={() => swipe('right')} disabled={loading}><svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={"stroke-green-900"}><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" className={"stroke-green-900"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </g></svg></button>
                </div>
            </div>
        </div>
    )

}