'use client'

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/api/auth/signin');
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session || !session.user) {
        return null;
    }

    return (
        <div>
            <h1>Profil</h1>
            <p>Bienvenue, {session.user.name || session.user.email || 'Utilisateur'}!</p>
        </div>
    );
}