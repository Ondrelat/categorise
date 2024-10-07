import React from 'react';
import { getCategories } from '../lib/categories';
import ClientCategoryTree from './ClientCategoryTree';

const CategoryTree = async () => {
    const categories = await getCategories();
    return <ClientCategoryTree categories={categories} />;
};

export default CategoryTree;