'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Inscription
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (res.ok) {
                // Connexion automatique après inscription réussie
                const result = await signIn('credentials', {
                    redirect: false,
                    login: email, // Utilisation de l'email pour la connexion automatique
                    password,
                });

                if (result?.error) {
                    setError('Inscription réussie, mais échec de la connexion automatique. Veuillez vous connecter manuellement.');
                    router.push('/login');
                } else {
                    // Redirection vers la page d'accueil
                    router.push('/');
                }
            } else {
                const data = await res.json();
                setError(data.message || 'Une erreur est survenue lors de l\'inscription');
            }
        } catch (error) {
            setError('Une erreur inattendue est survenue');
            console.error('Erreur d\'inscription:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-6 text-center font-bold">Inscription</h2>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nom d&apos;utilisateur
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        S&apos;inscrire
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <p className="text-gray-600">
                    Vous avez déjà un compte ?{' '}
                    <Link href="/login" className="text-blue-500 hover:text-blue-800">
                        Connectez-vous ici
                    </Link>
                </p>
            </div>
        </div>
    );
}