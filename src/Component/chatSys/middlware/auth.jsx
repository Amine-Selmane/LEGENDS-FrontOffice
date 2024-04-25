import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useStore } from 'zustand'; // Importing useStore from Zustand
import useAuthStore from '../store/ReduxStore';

const AuthorizeUser = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>; // Utiliser des fragments pour englober children
};

AuthorizeUser.propTypes = {
  children: PropTypes.node.isRequired,
};




// // Ne peut accéder à /password que s'il a entré le nom d'utilisateur
// export const ProtectRoute = ({ children }) => {
//   const username = useAuthStore.getState().auth.username;

//   if (!username) {
//     return <Navigate to={'/'} replace={true} />;
//   }

//   return <>{children}</>; // Utiliser des fragments pour englober children
// };

// ProtectRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };
export default AuthorizeUser;