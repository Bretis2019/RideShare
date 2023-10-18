"use client"
import {useEffect, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "@/app/firebase";

export default function Messages(props){
    const { convoId, id } = props;

    const convo = doc(db, "convos", convoId)
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        return onSnapshot(convo, function (doc) {
            const data = doc.data()
            setMessages(data.messages)
        })
    }, [])


    if(messages?.length > 0){
        const elements = messages.map(message => {
            return (
                <div className={`w-full flex ${message.sender_id === id ? "justify-start" : "justify-end"}`}
                     key={message.created_at}>
                    <div className={`${message.sender_id === id ? "bg-gray-800" : "bg-blue-600"} rounded-full px-4 py-2  max-w-[40svw] flex flex-wrap`}>{message.text}</div>
                </div>
            )
        })
        return (
            <div className={"flex flex-col gap-y-2 h-[66svh] overflow-y-scroll no-scrollbar"}>
                {elements}
            </div>
        )
    }
    else{
        return (
            <div className={"text-3xl text-center"}>Such empty...</div>
        )
    }
}