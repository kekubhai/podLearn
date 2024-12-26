'use client';

import { useState } from 'react';

const categories = ['All', 'Technology', 'Business', 'Science', 'Arts'];

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}