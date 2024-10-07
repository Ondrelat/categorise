// app/layout.tsx
import React from 'react';
import './globals.css'
import Navbar from './components/Navbar';
import ClientProvider from './components/ClientProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <ClientProvider>
        <body className="bg-gray-100">
          <Navbar />
          <main className="container mx-auto mt-4 p-4">
            {children}
          </main>
        </body>
      </ClientProvider>
    </html >
  );
}