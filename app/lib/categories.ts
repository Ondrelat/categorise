import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';
import { Category, CategoryTreeItem } from '../types';

export async function getCategories(): Promise<CategoryTreeItem[]> {
  const client = await clientPromise;
  const db = client.db("categorise");

  const categoriesCollection = await db.collection("categories").find({}).toArray();
  console.log('Raw categories from DB:', categoriesCollection);

  const categories: Category[] = categoriesCollection.map(doc => ({
    _id: new ObjectId(doc._id),
    name: doc.name,
    description: doc.description,
    slug: doc.slug,
    parentCategory: doc.parentCategory ? new ObjectId(doc.parentCategory) : null,
    createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    isActive: doc.isActive
  }));
  console.log('Mapped categories:', categories);

  const buildCategoryTree = (categories: Category[], parentCategory: ObjectId | null = null): CategoryTreeItem[] => {
    return categories
      .filter(cat =>
        (parentCategory === null && cat.parentCategory === null) ||
        (cat.parentCategory && cat.parentCategory.toString() === parentCategory?.toString())
      )
      .map(cat => ({
        id: cat._id.toString(),
        name: cat.name,
        description: cat.description,
        slug: cat.slug,
        isActive: cat.isActive,
        subcategories: buildCategoryTree(categories, cat._id)
      }));
  };

  const result = buildCategoryTree(categories);
  console.log('Final category tree:', JSON.stringify(result, null, 2));
  return result;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const client = await clientPromise;
  const db = client.db("categorise");

  const category = await db.collection("categories").findOne({ slug });

  if (!category) return null;

  return {
    _id: new ObjectId(category._id),
    name: category.name,
    description: category.description,
    slug: category.slug,
    parentCategory: category.parentCategory ? new ObjectId(category.parentCategory) : null,
    createdAt: new Date(category.createdAt),
    updatedAt: new Date(category.updatedAt),
    isActive: category.isActive
  };
}