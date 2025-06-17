import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#3b82f6"];

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchBooks = async () => {
            try {
                const res = await axios.get("https://virtual-bookshelf-server-teal.vercel.app/books");
                const myBooks = res.data.filter((book) => book.user_email === user.email);
                setBooks(myBooks);

                const categoryMap = {};
                myBooks.forEach((book) => {
                    categoryMap[book.book_category] = (categoryMap[book.book_category] || 0) + 1;
                });

                const stats = Object.entries(categoryMap).map(([category, count]) => ({
                    name: category,
                    value: count,
                }));
                setCategoryStats(stats);
            } catch (err) {
                console.error("Failed to load books:", err);
            }
        };

        fetchBooks();
    }, [user]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6">
                <img
                    src={user?.photoURL || "https://i.ibb.co/rZLvL0C/profile-placeholder.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                />
                <div>
                    <h2 className="text-2xl font-bold">{user?.displayName || "Anonymous User"}</h2>
                    <p className="text-gray-600">📧 {user?.email}</p>
                    <p className="text-gray-600">📚 Total Books: {books.length}</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">📊 Books by Category</h3>
                {categoryStats.length === 0 ? (
                    <p>No books to display</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryStats}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryStats.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Profile;
