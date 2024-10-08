import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
    try {
        const { articleType, categoryId, title, content, imageUrl } = await req.json();
        const client = await clientPromise;
        const db = client.db("categorise");

        let collectionName;
        switch (articleType) {
            case 'classement':
                collectionName = 'rankings';
                break;
            case 'forum':
                collectionName = 'forum_posts';
                break;
            case 'apprentissage':
                collectionName = 'learning_articles';
                break;
            case 'media':
                collectionName = 'media_articles';
                break;
            default:
                throw new Error('Type d\'article invalide');
        }

        const collection = db.collection(collectionName);

        const articleData = {
            categoryId: new ObjectId(categoryId),
            title,
            content,
            imageUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (articleType === 'classement') {
            delete articleData.content; // Les articles de classement n'ont pas de contenu
        }

        const result = await collection.insertOne(articleData);

        return NextResponse.json({ success: true, articleId: result.insertedId });
    } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
        return NextResponse.json({ success: false, error: "Erreur lors de la création de l'article" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const type = searchParams.get('type');

    if (!categoryId || !type) {
        return NextResponse.json({ error: 'Missing categoryId or type' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("categorise");

        let collectionName;
        switch (type) {
            case 'classement': collectionName = 'rankings'; break;
            case 'forum': collectionName = 'forum_posts'; break;
            case 'apprentissage': collectionName = 'learning_articles'; break;
            case 'media': collectionName = 'media_articles'; break;
            default: throw new Error('Invalid article type');
        }

        const articles = await db.collection(collectionName)
            .find({ categoryId: new ObjectId(categoryId) })
            .project({ title: 1 })
            .toArray();

        return NextResponse.json(articles.map(article => ({
            id: article._id.toString(),
            title: article.title,
            type
        })));
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}