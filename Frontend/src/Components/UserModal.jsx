import React, { useEffect, useState } from "react";

const USERMODAL = ({ userData, isOpen, onClose, onSave }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        username: userData?.username || "",
        email: userData?.email || "",
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        mobile: userData?.mobile || "",
    });

    useEffect(() => {
        setFormData({
            username: userData?.username || "",
            email: userData?.email || "",
            firstname: userData?.firstname || "",
            lastname: userData?.lastname || "",
            mobile: userData?.mobile || "",
        });
    }, [userData]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">User Details</h2>

                <div className="mb-2">
                    <label className="text-sm font-medium">Username</label>
                    <input
                        type="text"
                        value={formData.username}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                    />
                </div>

                <div className="mb-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default USERMODAL;
