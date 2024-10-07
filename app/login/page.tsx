'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await signIn('credentials', {
                redirect: false,
                login,
                password,
            });

            if (result?.error) {
                setError('Identifiants incorrects');
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            setError('Une erreur est survenue lors de la connexion');
            console.error('Erreur de la connexion:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-6 text-center font-bold">Connexion</h2>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
                        Email ou nom d&apos;utilisateur
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="login"
                        type="text"
                        placeholder="Email ou nom d'utilisateur"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Mot de passe
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Se connecter
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Vous n&apos;avez pas de compte ?{' '}
                    <Link href="/signup" className="text-blue-500 hover:text-blue-800">
                        Inscrivez-vous ici
                    </Link>
                </p>
            </div>
        </div>
    );
}