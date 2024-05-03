import React from 'react';
import ImageUpload from '../Audio/ImageUpload';

function ImageUploadPage() {
  const handleImageUpload = (imageFile) => {
    // Handle the uploaded image here
    console.log('Uploaded image:', imageFile);
    // You can perform further processing, like sending the image to the server
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <ImageUpload onUpload={handleImageUpload} />
    </div>
  );
}

export default ImageUploadPage;
