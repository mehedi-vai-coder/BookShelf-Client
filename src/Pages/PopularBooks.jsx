import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PopularBooks = () => {
    const [popularBooks, setPopularBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/books') 
            .then(res => {
                const sorted = res.data
                    .sort((a, b) => b.upvote - a.upvote)
                    .slice(0, 9); 
                setPopularBooks(sorted);
            })
            .catch(err => console.error('Failed to load books:', err));
    }, []);

    return (
        <section className="py-12 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🔥 Popular Books</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {popularBooks.map((book, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={book.cover_photo}
                                alt={book.book_title}
                                className="h-60 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.book_title}</h3>
                                <p className="text-sm text-gray-600">👤 {book.book_author}</p>
                                <p className="text-sm text-blue-600 mt-1">{book.book_category}</p>
                                <div className="mt-2 text-sm text-gray-500">👍 {book.upvote} upvotes</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;
