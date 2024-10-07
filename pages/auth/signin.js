import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignIn() {
    const [name, setname] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await signIn("credentials", {
            name,
            password,
            redirect: false,
        })
        if (result?.error) {
            // Gérer l'erreur
            console.error(result.error)
        } else {
            // Rediriger vers la page d'accueil ou le tableau de bord
            window.location.href = "/"
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="name"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Sign in</button>
            </form>
            <button onClick={() => signIn("google")}>Sign in with Google</button>
        </div>
    )
}