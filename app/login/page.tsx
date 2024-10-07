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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl mb-6 text-center font-extrabold text-gray-800">Connexion</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="login">
                            Email ou nom d&apos;utilisateur
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            id="login"
                            type="text"
                            placeholder="Email ou nom d'utilisateur"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Mot de passe
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                            type="submit"
                        >
                            Se connecter
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <button
                        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                        onClick={() => signIn('google')}
                    >
                        Se connecter avec Google
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Vous n&apos;avez pas de compte ?{' '}
                        <Link href="/signup" className="text-blue-500 hover:text-blue-700 transition-colors">
                            Inscrivez-vous ici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}