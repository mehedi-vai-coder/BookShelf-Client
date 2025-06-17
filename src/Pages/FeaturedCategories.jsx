import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://virtual-bookshelf-server-teal.vercel.app/books')
            .then(res => {
                const categoryMap = {};

                res.data.forEach(book => {
                    const cat = book.book_category;
                    if (!categoryMap[cat]) {
                        categoryMap[cat] = {
                            name: cat,
                            count: 1,
                            cover_photo: book.cover_photo,
                        };
                    } else {
                        categoryMap[cat].count += 1;
                    }
                });

                const uniqueCategories = Object.values(categoryMap);
                setCategories(uniqueCategories);
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    return (
        <section className="py-12 px-4 bg-gradient-to-r from-indigo-50 to-pink-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    🎯 Featured Categories
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                        >
                            <img
                                src={cat.cover_photo}
                                alt={cat.name}
                                className="h-60 w-full object-cover object-top rounded-t-2xl"
                            />
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-gray-800">{cat.name}</h3>
                                <p className="text-sm text-gray-500">{cat.count} books available</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
};

export default FeaturedCategories;
