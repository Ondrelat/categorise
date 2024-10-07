// app/layout.tsx
import React from 'react';
import { getServerSession } from "next-auth/next";
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div>
                  <Link href="/" className="flex items-center py-4 px-2">
                    <span className="font-semibold text-gray-500 text-lg">MonSite</span>
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-1">
                  <Link href="/" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Accueil</Link>
                  <Link href="/categories" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300">Catégories</Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
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
        <main className="container mx-auto mt-4 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}