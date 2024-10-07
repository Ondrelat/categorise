import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();
        const client = await clientPromise;
        const db = client.db("categorise");

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Cet email est déjà utilisé." }, { status: 400 });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const result = await db.collection('users').insertOne({
            email,
            password: hashedPassword,
            name,
        });

        return NextResponse.json({ message: "Utilisateur créé avec succès.", userId: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Une erreur est survenue lors de l'inscription." }, { status: 500 });
    }
}