import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal">
                <div className="modal-header bg-white p-6 rounded-lg shadow-lg w-maxS mx-auto">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold">{title}</h2>
                        <button
                            className="bg-white text-primary px-2 py-2 rounded-full hover:bg-primary hover:text-white"
                            onClick={onClose}
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>
                    <div className="modal-content">{content}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
