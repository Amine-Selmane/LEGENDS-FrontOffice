import React, { useState, useEffect } from "react";
import axios from "axios";
import { UilSearch } from '@iconscout/react-unicons';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Conversation from "../Coversation/Conversation";
import { findChat } from "../api/ChatRequests";
import  toast,{ Toaster } from 'react-hot-toast';
import ThreePIcon from '@mui/icons-material/ThreeP';
const LogoSearch = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newChatUser, setNewChatUser] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/getall')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Charger les conversations de l'utilisateur actuel
    axios.get(`http://localhost:5000/conver/${currentUser}`)
      .then(response => {
        setConversations(response.data);
      })
      .catch(error => {
        console.error('Error fetching conversations:', error);
      });
  }, [currentUser]);

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user._id !== currentUser && // Ne pas afficher l'utilisateur actuel
      user.role !== "admin" && // Ne pas afficher les utilisateurs avec le rôle "admin"
      !conversations.some(conversation => conversation.members.includes(user._id)) // Ne pas afficher les utilisateurs avec lesquels l'utilisateur actuel a déjà une conversation
    ));
  }, [users, currentUser, conversations]);

  const handleSearchChange = (event, value) => {
    setSearchQuery(value);
    // Filtrer les utilisateurs en fonction de la recherche et des conversations
    const filtered = users.filter(user => {
      // Appliquer la recherche sur les propriétés pertinentes de l'utilisateur
      const matchesSearch =
        (user.firstName && user.firstName.toLowerCase().includes(value.toLowerCase())) ||
        (user.lastName && user.lastName.toLowerCase().includes(value.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(value.toLowerCase())) ||
        (user.address && user.address.toLowerCase().includes(value.toLowerCase())) ||
        (user.mobile && user.mobile.toString().toLowerCase().includes(value.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(value.toLowerCase())) ||
        (user.grade && user.grade.toLowerCase().includes(value.toLowerCase()));
      
      // Ne pas afficher l'utilisateur actuel dans la liste des résultats
      const isNotCurrentUser = user._id !== currentUser;
  
      // Ne pas afficher les utilisateurs avec le rôle "admin"
      const isNotAdmin = user.role !== "admin";
  
      // Ne pas afficher les utilisateurs avec lesquels l'utilisateur actuel a déjà une conversation
      const hasNoConversation = !conversations.some(conversation => conversation.members.includes(user._id));
  
      return matchesSearch && isNotCurrentUser && isNotAdmin && hasNoConversation;
    });
  
    setFilteredUsers(filtered);
  };
  
  

  const handleUserSelect = (event, user) => {
    setSelectedUser(user);
  };


  const createChat = async () => {
    if (selectedUser) {
      try {
        // Vérifier si une conversation existe déjà entre l'utilisateur actuel et la personne sélectionnée
        const response = await findChat(currentUser, selectedUser._id);
        const existingConversation = response.data;
  
        if (existingConversation) {
          console.log("La conversation existe déjà :", existingConversation);
          toast.error('La conversation existe déjà!');
     
                    // Vous pouvez gérer ici la redirection vers la conversation existante si nécessaire
          return;
        }
  
        // Si aucune conversation n'existe, créer une nouvelle
        const token = localStorage.getItem("token");
        const newChatResponse = await axios.post("http://localhost:5000/conver/", {
          senderId: currentUser,
          receiverId: selectedUser._id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Nouvelle conversation créée :", newChatResponse.data);
        setNewChatUser(selectedUser);
        setSelectedUser(null);
      } catch (error) {
        console.error("Erreur lors de la création de la conversation :", error.message);
      }
    }
  };
  


  return (
    <div className="LogoSearch">
      <Autocomplete
        options={filteredUsers}
        getOptionLabel={(user) => `${user.firstName} ${user.lastName}`}
        renderInput={(params) => (
          <TextField
            {...params}
            id="txt-srch"
            name="search"
            placeholder="Search for someone..."
            className="rounded-pill"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e, e.target.value)}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <div className="s-icon">
                  <UilSearch/>
                </div>
              ),
            }}
          />
        )}
        onChange={handleUserSelect}
      />
<ThreePIcon onClick={createChat} disabled={!selectedUser} style={{ color: selectedUser ? 'rgb(28, 89, 0)' : 'gray' ,width: '600px',height:'50px'}} />
    <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default LogoSearch;