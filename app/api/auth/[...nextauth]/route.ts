import NextAuth, { AuthOptions, SessionStrategy } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

if (!process.env.GOOGLE_ID) {
    throw new Error("Missing GOOGLE_ID");
}

if (!process.env.GOOGLE_SECRET) {
    throw new Error("Missing GOOGLE_SECRET");
}

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                login: { label: "Email or Username", type: "text", placeholder: "email@example.com or username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.login || !credentials?.password) {
                    console.log("Identifiants manquants");
                    return null;
                }
                try {
                    const client = await clientPromise;
                    const usersCollection = client.db("categorise").collection("users");

                    // Recherche par email ou nom d'utilisateur
                    const user = await usersCollection.findOne({
                        $or: [
                            { email: credentials.login },
                            { name: credentials.login }
                        ]
                    });

                    console.log("Utilisateur trouvé:", user ? "Oui" : "Non");
                    if (user) {
                        const isValid = await bcrypt.compare(credentials.password, user.password);
                        console.log("Mot de passe valide:", isValid);
                        if (isValid) {
                            return {
                                id: user._id.toString(),
                                name: user.name,
                                email: user.email
                            };
                        }
                    }
                    console.log("Authentification échouée");
                    return null;
                } catch (error) {
                    console.error("Erreur lors de l'autorisation:", error);
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    callbacks: {
        session: ({ session, token }: { session: Session; token: JWT }) => {
            if (session.user) {
                session.user.id = token.sub!; // 'sub' est l'ID utilisateur standard dans les JWT
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }