"use client"
import {signOut} from "next-auth/react";

export default function SignoutButton(){
    return <button className="disabled:opacity-40 flex w-fit justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" onClick={() => signOut()} >Sign out</button>
}