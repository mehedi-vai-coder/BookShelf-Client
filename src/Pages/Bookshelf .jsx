import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 🔥 Make sure you're using this

const Bookshelf = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        axios.get('https://virtual-bookshelf-server-teal.vercel.app/books')
            .then(res => setBooks(res.data))
            .catch(err => console.error('Error fetching books:', err));
    }, []);

    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.book_author.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' || book.reading_status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📚 Explore Books</h2>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 w-full md:w-72 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 w-full md:w-64 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Reading Status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Reading">Reading</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Book Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                        >
                            <img
                                src={book.cover_photo}
                                alt={book.book_title}
                                className="h-60 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.book_title}</h3>
                                <p className="text-sm text-gray-600 mb-1">👤 {book.book_author}</p>
                                <p className="text-sm text-blue-600 font-medium mb-1">{book.book_category}</p>
                                <p className="text-xs text-gray-500 italic mb-2">{book.reading_status}</p>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">👍 {book.upvote}</span>
                                </div>
                                <Link
                                    to={`/books/${book._id}`} // 🔥 Navigates to dynamic book details
                                    className="block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                                >
                                    Book Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">No books match your filters 😢</p>
                )}
            </div>
        </div>
    );
};

export default Bookshelf;
