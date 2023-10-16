'use client';
import {useSession} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {MyCombobox} from "@/app/components/MyCombobox";
import {hobbies} from "./hobbies"
import LoadingSpinner from "@/app/components/LoadingSpinner";

function RemoveSVG(){
    return (
        <svg fill="#ffffff" width="15px" height="15px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z" /></g></svg>
    )
}

export default function Form() {

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });

    const [bio, setBio] = useState("");
    const [hobbiesInput, setHobbiesInput] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hobbiesCards, setHobbiesCards] = useState(null);
    const router = useRouter();


    async function handleClick(){
        setLoading(true)
        fetch("/api/aboutme", {
            method: "POST",
            body: JSON.stringify({
                bio: bio,
                hobbies: hobbiesInput
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    router.push('/');
                }
                setLoading(false);
            })
            .catch(error => {console.log(error)})
    }

    function addHobby(hobby){
        if (hobby !== hobbies[0]) {
            if (!hobbiesInput.includes(hobby)) {
                setHobbiesInput(prevState => [...prevState, hobby]);
            }
        }
    }

    function removeHobby(hobby) {
        const arr = [...hobbiesInput];
        const index = arr.findIndex(item => item === hobby);
        if (index !== -1) {
            arr.splice(index, 1);
            setHobbiesInput(arr);
        }
    }


    useEffect(() => {
        const elements = hobbiesInput.map(item => {
            return (
                <div key={item.name} className={"Card flex justify-between items-center gap-x-2 text-sm px-2 py-1 rounded-full"}>
                    <div>{item.name}</div>
                    <div className={"z-50 cursor-pointer"} onClick={() => removeHobby(item)}><RemoveSVG /></div>
                </div>
            )
        })
        setHobbiesCards(elements);
    }, [hobbiesInput]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto rounded-full"
                        src="/logo.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Tell us about you
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">

                        <div>

                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                message</label>
                            <textarea id="message" rows="4" value={bio} onChange={event => setBio(event.target.value)}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="A short description of yourself"></textarea>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    University
                                </label>
                            </div>
                            <div className="mt-2">
                                <MyCombobox data={hobbies} setData={addHobby}/>
                            </div>
                        </div>

                        <div className={"flex items-center gap-x-2 flex-wrap gap-y-3 max-h-24 no-scrollbar overflow-y-scroll"}>
                            {hobbiesCards}
                        </div>

                        <div>
                            <button
                                onClick={handleClick}
                                disabled={!bio || hobbiesInput.length === 0}
                                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {loading ? <LoadingSpinner /> : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}