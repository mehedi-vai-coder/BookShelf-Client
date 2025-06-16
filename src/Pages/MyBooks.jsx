import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import UpdateBookModal from "./UpdateBookModal";



const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBook, setEditingBook] = useState(null); // for modal trigger


    const fetchMyBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/books");
            const filtered = res.data.filter(book => book.user_email === user?.email);
            setMyBooks(filtered);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch books:", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (user?.email) {
            fetchMyBooks();
        }
    }, [user]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`http://localhost:5000/books/${id}`);
                Swal.fire("Deleted!", "Your book has been removed.", "success");
                fetchMyBooks();
            } catch (err) {
                console.error("Delete failed:", err);
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    const handleUpdate = (book) => {
        setEditingBook(book);
    };


    if (loading) return <p className="text-center py-20">Loading your books...</p>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">📚 My Books</h2>
            {myBooks.length === 0 && <p>No books added yet!</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {myBooks.map((book) => (
                    <motion.div
                        key={book._id}
                        className="bg-white shadow-xl p-4 rounded-xl"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img
                            src={book.cover_photo}
                            alt={book.book_title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">{book.book_title}</h3>
                        <p className="text-sm text-gray-500">by {book.book_author}</p>
                        <p className="text-xs mt-2">📂 {book.book_category}</p>
                        <p className="text-xs">🗂️ {book.reading_status}</p>
                        <p className="text-xs">📄 {book.total_page} pages</p>
                        <p className="text-xs mt-2 text-gray-700">{book.book_overview.slice(0, 60)}...</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => handleUpdate(book)}>✏️ Update</button>
                            <button variant="destructive" onClick={() => handleDelete(book._id)}>
                                🗑️ Delete
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            {editingBook && (
                <UpdateBookModal
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                    refetch={fetchMyBooks}
                />
            )}
        </div>

    );
};

export default MyBooks;
