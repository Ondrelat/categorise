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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl mb-6 text-center font-extrabold text-gray-800">Inscription</h2>
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                            Nom d&apos;utilisateur
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            id="name"
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none transition duration-150 ease-in-out"
                            type="submit"
                        >
                            S&apos;inscrire
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button
                        className="w-full bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out"
                        onClick={() => signIn('google')}
                    >
                        S&apos;inscrire avec Google
                    </button>
                </div>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Vous avez déjà un compte ?{' '}
                        <Link href="/login" className="text-blue-500 hover:text-blue-700 transition-colors">
                            Connectez-vous ici
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
