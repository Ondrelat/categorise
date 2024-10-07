import clientPromise from "../lib/mongodb"
import { ObjectId, MongoClient } from 'mongodb'

// Définissez une interface pour la structure de vos catégories
interface Category {
    _id: ObjectId;
    name: string;
    // Ajoutez d'autres champs selon votre schéma de catégorie
}

export default async function CategoriesPage() {
    try {
        const client: MongoClient = await clientPromise
        const db = client.db("categorise")
        const categories = await db.collection<Category>("categories").find({}).toArray()

        return (
            <div>
                <h1>Catégories</h1>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id.toString()}>{category.name}</li>
                    ))}
                </ul>
            </div>
        )
    } catch (e) {
        console.error(e)
        return <div>Une erreur s&apos;est produite lors de la récupération des catégories.</div>
    }
}