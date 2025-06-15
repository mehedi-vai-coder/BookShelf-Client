import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateBookModal = ({ book, onClose, refetch }) => {
    const [formData, setFormData] = useState({ ...book });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

       
        const { _id, user_email, ...cleanedData } = formData;

        try {
            const res = await axios.put(`http://localhost:5000/books/${book._id}`, cleanedData);
            if (res.data.success) {
                Swal.fire("✅ Updated!", "Book info updated successfully.", "success");
                refetch();
                onClose();
            } else {
                Swal.fire("⚠️ Nothing changed!", "You didn’t change anything.", "info");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("❌ Error", err?.response?.data?.details || "Failed to update book.", "error");
        }
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">✏️ Update Book</h2>
                <form onSubmit={handleUpdate} className="space-y-3">
                    <input type="text" name="book_title" value={formData.book_title} onChange={handleChange} className="input" required />
                    <input type="text" name="book_author" value={formData.book_author} onChange={handleChange} className="input" required />
                    <input type="text" name="cover_photo" value={formData.cover_photo} onChange={handleChange} className="input" required />
                    <input type="number" name="total_page" value={formData.total_page} onChange={handleChange} className="input" required />
                    <textarea name="book_overview" value={formData.book_overview} onChange={handleChange} className="input" rows={3} />

                    <div className="flex gap-4 justify-end">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBookModal;
