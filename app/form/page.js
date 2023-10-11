'use client';
import {useSession} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import { useState } from 'react';
import {MyCombobox} from "@/app/components/MyCombobox";
import {wilayas} from "@/app/form/wailayas";
import {universities} from "@/app/form/universities";
import {majors} from "@/app/form/majors";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const genders = [{name: "male"}, {name: "female"}]

export default function Form() {

    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });

    const [name, setName] = useState("");
    const [uni, setUni] = useState("");
    const [home, setHome] = useState("");
    const [major, setMajor] = useState("");
    const [loading, setLoading] = useState(false);
    const [age, setAge] = useState(18);
    const [gender, setGender] = useState("");
    const router = useRouter();



    async function handleClick(){
        setLoading(true)
        fetch("/api/form", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                university: uni,
                home: home,
                major: major,
                age: age,
                gender: gender
            })
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === 200){
                    router.push('/images');
                }
                setLoading(false);
            })
            .catch(error => {console.log(error)})
    }

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
                        Fill out your information
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div className={"flex gap-x-4"}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white py-1.5 text-black px-4 capitalize shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Age
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        min={18}
                                        max={90}
                                        autoComplete="age"
                                        onChange={(e) => setAge(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 bg-white py-1.5 text-black px-4 capitalize shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Gender
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <MyCombobox data={genders} setData={setGender}/>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    University
                                </label>
                            </div>
                            <div className="mt-2">
                                <MyCombobox data={universities} setData={setUni}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Major
                                </label>
                            </div>
                            <div className="mt-2">
                                <MyCombobox data={majors} setData={setMajor}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Hometown
                                </label>
                            </div>
                            <div className="mt-2">
                                <MyCombobox data={wilayas} setData={setHome}/>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleClick}
                                disabled={!name || !uni || !home ||  !major || !age || !gender}
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