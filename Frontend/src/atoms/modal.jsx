import React, { useEffect } from 'react';

const MODAL = ({ isOpen, message, onClose, onConfirm }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOutsideClick = (event) => {
        if (event.target.id === "modal-overlay") {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
            onClick={handleOutsideClick} // Handle outside click
        >
            <div
                className="bg-white rounded-2xl p-6 shadow-lg w-96 text-center"
                onClick={(e) => e.stopPropagation()} // Prevent modal clicks from closing
            >
                <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
                <p className="text-gray-700">{message}</p>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MODAL;
