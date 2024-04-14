import React, { useState } from 'react';
import { NormalizedImage } from '../../../shared/types.ts';
import ImageModal from './ImageModal.tsx';

interface ImageItemProps {
  image: NormalizedImage;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow rounded-md overflow-hidden">
      <div className="relative w-full h-48 cursor-pointer" onClick={openModal}>
        <img
          src={image.src}
          alt={image.alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      {isModalOpen && <ImageModal image={image} onClose={closeModal} />}
    </div>
  );
};

export default ImageItem;
