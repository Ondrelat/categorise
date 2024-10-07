import { ObjectId } from 'mongodb';

export interface Category {
    _id: ObjectId;
    name: string;
    description: string;
    slug: string;
    parentCategory: ObjectId | null;  // Changé de parentId à parentCategory
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export interface CategoryTreeItem {
    id: string;
    name: string;
    description: string;
    slug: string;
    isActive: boolean;
    subcategories: CategoryTreeItem[];
}