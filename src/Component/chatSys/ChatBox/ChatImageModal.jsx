import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import "./ChatImageModal.css";

const ChatImageModal = ({ imageUrl, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal show={true} onHide={onClose} centered size="xl" className="custom-modal">
      <Modal.Body>
        <Image src={imageUrl} fluid className="custom-image" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={() => handleDownloadImage(imageUrl)}>
          Télécharger
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatImageModal;