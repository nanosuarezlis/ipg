import React, { createContext, useReducer } from 'react';

const initialState = {
  userId: '',
  userApiId: '',
  setUserData: async () => {}
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_IDS':
      return {
        ...state,
        userId: action.payload.userId,
        userApiId: action.payload.userApiId
      };
    default:
      return state;
  }
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserData = async () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = `guest-${Math.floor(Math.random() * 100000)}`;
      localStorage.setItem('userId', userId);
    }
    
    const storageKey = `api_id_${userId}`;
    let userApiId = localStorage.getItem(storageKey);
    if (!userApiId) {
      const response = await fetch('http://localhost:3001/new_guest');
      const { guest_session_id } = await response.json();
      userApiId = guest_session_id;
      localStorage.setItem(storageKey, userApiId);
    }

    // Get voted movies from localStorage
    const votedMovies = JSON.parse(localStorage.getItem('votedMovies')) || [];

    dispatch({
      type: 'SET_USER_IDS',
      payload: {
        userId,
        userApiId,
        votedMovies // add votedMovies to the payload
      }
    });

  };

  return (
    <UserContext.Provider value={{ ...state, ...{ setUserData } }}>
      {children}
    </UserContext.Provider>
  );
};
