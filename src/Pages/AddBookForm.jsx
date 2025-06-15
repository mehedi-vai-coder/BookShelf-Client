import React, { use, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from '../Context/AuthContext';

const AddBookForm = () => {
    const { user } = use(AuthContext);

    const [formData, setFormData] = useState({
        book_title: '',
        cover_photo: '',
        total_page: '',
        book_author: '',
        book_category: 'Fiction',
        reading_status: 'Want-to-Read',
        book_overview: '',
        upvote: 0,
        user_email: user?.email || '',
        user_name: user?.displayName || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/books', formData);

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Your Book Added successfully.",
                    icon: "success",
                    draggable: true
                });
                setFormData({
                    book_title: '',
                    cover_photo: '',
                    total_page: '',
                    book_author: '',
                    book_category: 'Fiction',
                    reading_status: 'Want-to-Read',
                    book_overview: '',
                    upvote: 0,
                    user_email: user?.email || '',
                    user_name: user?.name || '',
                });

            } else {
                toast.error('Something went wrong!');
            }
        } catch (err) {
            console.error(err);
            toast.error(' Failed to add book. Try again.');
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl mt-20 mb-20">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">📚 Add a New Book</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Book Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="book_title"
                        value={formData.book_title}
                        onChange={handleChange}
                        placeholder="Book Title"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="book_author"
                        value={formData.book_author}
                        onChange={handleChange}
                        placeholder="Author"
                        required
                        className="input"
                    />
                    <input
                        type="text"
                        name="cover_photo"
                        value={formData.cover_photo}
                        onChange={handleChange}
                        placeholder="Cover Photo URL"
                        required
                        className="input"
                    />
                    <input
                        type="number"
                        name="total_page"
                        value={formData.total_page}
                        onChange={handleChange}
                        placeholder="Total Pages"
                        required
                        className="input"
                    />
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="book_category" value={formData.book_category} onChange={handleChange} className="input">
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>

                    <select name="reading_status" value={formData.reading_status} onChange={handleChange} className="input">
                        <option value="Want-to-Read">Want to Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Read">Read</option>
                    </select>
                </div>

                {/* Overview */}
                <textarea
                    name="book_overview"
                    value={formData.book_overview}
                    onChange={handleChange}
                    placeholder="Short Overview..."
                    rows="4"
                    className="input"
                    required
                />

                {/* Read-Only */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        readOnly
                        className="input bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        readOnly
                        className="input bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <input
                        type="number"
                        name="upvote"
                        value={formData.upvote}
                        readOnly
                        className="input bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
                >
                    ➕ Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;
