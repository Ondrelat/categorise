// app/layout.tsx
import React from 'react';
import './globals.css'
import Navbar from './components/Navbar';
import ClientProvider from './components/ClientProvider';
import SideBar from './components/Sidebar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr">
      <body className={`bg-gray-50 flex flex-col min-h-screen`}>
        <ClientProvider>
          <Navbar />
          <div className="flex flex-grow">
            <SideBar />
            <main className="flex-grow p-4 book-bg">
              {children}
            </main>
          </div>
        </ClientProvider>
      </body>
    </html >
  );
}