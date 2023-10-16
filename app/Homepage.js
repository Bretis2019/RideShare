"use client"
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Homepage({ children }) {
    const session = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/signin');
        },
    });

    return (
        <>
            <div className="flex justify-center items-center">
                {children}
            </div>
        </>
    )
}

Homepage.requireAuth = true