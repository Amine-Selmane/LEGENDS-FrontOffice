import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const getMessages = (id) => API.get(`/msg/${id}`);

export const addMessage = (data) => {
    // Créez un objet FormData pour envoyer les données du message, y compris le fichier
    const formData = new FormData();
    formData.append('chatId', data.chatId);
    formData.append('senderId', data.senderId);
    formData.append('text', data.text);
    if (data.file) {
      formData.append('file', data.file);
    }
  
    // Effectuez une requête POST vers votre endpoint d'API avec les données du formulaire
    return axios.post('http://localhost:5000/msg/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Assurez-vous de définir le type de contenu approprié pour les fichiers
      },
    });
  };