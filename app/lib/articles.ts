import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';
import { Article } from '@/app/types';

export async function getArticleById(articleId: string): Promise<Article | null> {
    const client = await clientPromise;
    const db = client.db("categorise");

    const collections = ['rankings', 'forum_posts', 'learning_articles', 'media_articles'];

    for (const collectionName of collections) {
        const articleDoc = await db.collection(collectionName).findOne({ _id: new ObjectId(articleId) });
        if (articleDoc) {
            const article: Article = {
                id: articleDoc._id.toString(),
                title: articleDoc.title,
                content: articleDoc.content,
                imageUrl: articleDoc.imageUrl,
                type: collectionName.replace('_articles', '').replace('_posts', '').replace('s', ''),
                createdAt: articleDoc.createdAt,
                categoryId: articleDoc.categoryId.toString(),
                // Ajoutez ici d'autres champs requis par l'interface Article
            };
            return article;
        }
    }

    return null;
}