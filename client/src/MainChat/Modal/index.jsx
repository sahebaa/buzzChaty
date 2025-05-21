import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className="mt-4 text-right">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
