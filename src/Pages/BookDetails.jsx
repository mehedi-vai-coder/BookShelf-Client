import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const BookDetails = () => {
    const { id } = useParams();
    // console.log(id)
    const { user } = useContext(AuthContext);
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(0);

    // Fetch book and reviews
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookRes = await axios.get(`https://virtual-bookshelf-server-teal.vercel.app/books/${id}`);
                const bookData = bookRes.data;
                bookData.upvote = Number(bookData.upvote);
                // setBook();
                setBook({ ...bookData });
                setUpvoteCount(Number(bookData.upvote));
            } catch (err) {
                console.error(err);
            }
        };



        const fetchReviews = async () => {
            try {
                const res = await axios.get(`https://virtual-bookshelf-server-teal.vercel.app/reviews?book_id=${id}`);
                setReviews(res.data);

                const existing = res.data.find(r => r.reviewer_email === user?.email);
                if (existing) {
                    setHasReviewed(true);
                } else {
                    setHasReviewed(false);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchBookDetails();
        fetchReviews();
    }, [id, user]);

    const handleUpvote = async () => {
        if (!user || user.email === book?.user_email) return;

        try {
            const res = await axios.patch(`https://virtual-bookshelf-server-teal.vercel.app/books/${id}/upvote`);
            const updated = res.data;

            if (typeof updated?.upvote === 'number') {
                setUpvoteCount(updated.upvote);
                setBook(prev => ({
                    ...prev,
                    upvote: updated.upvote
                }));
            } else {
                console.warn("Unexpected upvote response:", res.data);
            }
        } catch (err) {
            console.error("Upvote failed:", err);
        }
    };


    const refreshReviews = async () => {
        const res = await axios.get(`https://virtual-bookshelf-server-teal.vercel.app/reviews?book_id=${id}`);
        setReviews(res.data);
        setUserReview('');
        setEditingReviewId(null);
        setHasReviewed(res.data.some(r => r.reviewer_email === user?.email));
    };

    const handleReviewSubmit = async () => {
        if (!user) return;

        const payload = {
            book_id: id,
            reviewer_email: user.email,
            reviewer_name: user.displayName,
            reviewer_photo: user.photoURL,
            review_text: userReview,
        };

        try {
            if (editingReviewId) {
                await axios.patch(`https://virtual-bookshelf-server-teal.vercel.app/reviews/${editingReviewId}`, { review_text: userReview });
            } else {
                await axios.post(`https://virtual-bookshelf-server-teal.vercel.app/reviews`, payload);
            }
            await refreshReviews();
        } catch (err) {
            console.error("Review error:", err.response?.data || err.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await axios.delete(`https://virtual-bookshelf-server-teal.vercel.app/reviews/${reviewId}`);
            await refreshReviews();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditReview = (review) => {
        setUserReview(review.review_text);
        setEditingReviewId(review._id);
    };

    if (!book) return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <img src={book.cover_photo} alt={book.book_title} className="w-full h-96 object-cover rounded-xl mb-6" />
            <h2 className="text-3xl font-bold">{book.book_title}</h2>
            <p className="text-gray-600">By: {book.book_author}</p>
            <p>📄 Pages: {book.total_page}</p>
            <p>📚 Category: {book.book_category}</p>
            {/* 🔁 Reading Status Tracker */}
            <div className="flex items-center gap-2 my-2">
                <span>📘 Status:</span>
                {user?.email === book.user_email ? (
                    <select
                        value={book.reading_status}
                        onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                                const res = await axios.patch(`https://virtual-bookshelf-server-teal.vercel.app/books/${id}`, {
                                    reading_status: newStatus
                                });

                                if (res.status === 200) {
                                    setBook(prev => ({
                                        ...prev,
                                        reading_status: newStatus
                                    }));
                                }
                            } catch (err) {
                                console.error("Failed to update reading status:", err);
                            }
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {book.reading_status === "Want-to-Read" && <option value="Reading">Reading</option>}
                        {book.reading_status === "Reading" && <option value="Read">Read</option>}
                        <option value={book.reading_status}>{book.reading_status}</option>
                    </select>
                ) : (
                    <span>{book.reading_status}</span>
                )}
            </div>
            <p className="my-4 italic text-gray-700">{book.book_overview}</p>

            <div className="my-4 text-sm text-gray-500">
                Added by: {book.user_name} ({book.user_email})
            </div>

            {user && user.email !== book.user_email && (
                <button
                    onClick={handleUpvote}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
                >
                    🔼 Upvote ({upvoteCount})
                </button>
            )}




            {/* 💬 Review Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">💬 Reviews</h3>

                {user && (
                    <div className="mb-6">
                        <textarea
                            value={userReview}
                            onChange={(e) => setUserReview(e.target.value)}
                            placeholder={editingReviewId ? "Edit your review..." : hasReviewed ? "You've already reviewed." : "Write your review..."}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            disabled={!editingReviewId && hasReviewed}
                        />
                        <button
                            onClick={handleReviewSubmit}
                            className={`mt-2 px-4 py-2 rounded-lg text-white ${editingReviewId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            disabled={!userReview.trim()}
                        >
                            {editingReviewId ? "Update Review" : "Post Review"}
                        </button>
                    </div>
                )}

                {reviews.map((review) => (
                    <div key={review._id} className="border-t py-4 flex items-start gap-4">
                        <img
                            src={review.reviewer_photo}
                            alt={review.reviewer_name}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">{review.reviewer_name}</p>
                            <p className="text-gray-600">{review.review_text}</p>
                            {user?.email === review.reviewer_email && (
                                <div className="text-sm text-blue-600 mt-1">
                                    <button onClick={() => handleEditReview(review)} className="mr-2">Edit</button>
                                    <button onClick={() => handleDeleteReview(review._id)} className="text-red-600">Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookDetails;
