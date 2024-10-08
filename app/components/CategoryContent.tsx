'use client';

import React, { useState } from 'react';

type ContentSection = 'classement' | 'forum' | 'apprentissage' | 'media';

const CategoryContent: React.FC<{ categoryId: string }> = ({ categoryId }) => {
    const [activeSection, setActiveSection] = useState<ContentSection>('classement');

    const renderContent = () => {
        switch (activeSection) {
            case 'classement':
                return <div>Contenu du classement pour la catégorie {categoryId}</div>;
            case 'forum':
                return <div>Contenu du forum pour la catégorie {categoryId}</div>;
            case 'apprentissage':
                return <div>Contenu d&apos;apprentissage pour la catégorie {categoryId}</div>;
            case 'media':
                return <div>Contenu média pour la catégorie {categoryId}</div>;
        }
    };

    return (
        <div>
            <div className="flex mb-4">
                {(['classement', 'forum', 'apprentissage', 'media'] as ContentSection[]).map((section) => (
                    <button
                        key={section}
                        className={`mr-2 px-4 py-2 ${activeSection === section ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        onClick={() => setActiveSection(section)}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>
            {renderContent()}
        </div>
    );
};

export default CategoryContent;