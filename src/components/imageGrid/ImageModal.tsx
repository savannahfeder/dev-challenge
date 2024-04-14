import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface ImageModalProps {
  image: {
    src: string;
    alt: string;
  };
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="fixed inset-0 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        <div className="relative">
          <button
            type="button"
            className="absolute top-2 right-2 bg-white bg-opacity-50 rounded-full p-2 text-gray-800 hover:bg-opacity-75 focus:outline-none"
            onClick={onClose}
          >
            <FaTimes className="h-4 w-4" />
          </button>
          <img src={image.src} alt={image.alt} className="max-h-screen" />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
