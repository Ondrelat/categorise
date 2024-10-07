'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type UserType = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserType | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'loading') {
            setLoading(true);
        } else if (status === 'authenticated' && session?.user) {
            setIsAuthenticated(true);
            setUser(session.user as UserType); // Cast explicite ici
            setLoading(false);
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        }
    }, [session, status]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);