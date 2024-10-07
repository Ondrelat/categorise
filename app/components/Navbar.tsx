// app/components/Navbar.tsx
'use client'

import React from 'react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                    <Link href="/" className="font-semibold text-xl tracking-tight">Mon Site</Link>
                </div>
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div className="text-sm lg:flex-grow">
                        <Link href="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
                            Accueil
                        </Link>
                        <Link href="/categories" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4">
                            Catégories
                        </Link>
                        {session && (
                            <Link href="/profile" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">
                                Profil
                            </Link>
                        )}
                    </div>
                    <div>
                        {session ? (
                            <>
                                <span className="py-2 px-2 font-medium text-gray-500">Bonjour, {session.user?.name}</span>
                                <Link href="/api/auth/signout" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Se déconnecter</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Connexion</Link>
                                <Link href="/signup" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Inscription</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;