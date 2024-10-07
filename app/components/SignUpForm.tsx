import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });
            if (res.ok) {
                signIn('credentials', { email, password });
            } else {
                const data = await res.json();
                setError(data.message || 'Une erreur est survenue lors de l\'inscription.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            setError('Une erreur inattendue est survenue lors de l\'inscription. Veuillez réessayer.');

            if (error instanceof Error) {
                // Si c'est une instance d'Error, nous pouvons accéder à la propriété 'message'
                setError(`Erreur: ${error.message}`);
            } else {
                // Si ce n'est pas une instance d'Error, nous utilisons une message générique
                setError('Une erreur inattendue est survenue. Veuillez réessayer.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">S&apos;inscrire</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    );
};

export default SignUpForm;