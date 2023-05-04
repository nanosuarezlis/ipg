// import React from 'react';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { AppBar, Toolbar, Button } from '@material-ui/core';
// import SearchMovies from './components/SearchMovies';
// import MyMovies from './components/MyMovies';

// const theme = createTheme();

// const generateGuestUserId = () => {
//   return `guest-${Math.floor(Math.random() * 100000)}`;
// };

// const fetchNewGuestId = async () => {
//   const response = await fetch('http://localhost:3001/new_guest');
//   const { guest_session_id } = await response.json();
  
//   return guest_session_id;
// };

// const getUserId = () => {
//   let userId = localStorage.getItem('userId');
//   if (!userId) {
//     userId = generateGuestUserId();
//     localStorage.setItem('userId', userId);
//   }
//   return userId;
// };

// const getUserApiId = async () => {
//   const user_id = localStorage.getItem('userId');
//   const storageKey = `api_id_${user_id}`
//   let userApiId = localStorage.getItem('userApiId');

//   if (!userApiId) {
//     const id = await fetchNewGuestId();
//     localStorage.setItem(storageKey, id);
//   }
//   return userApiId;
// };

// const renderApp = async () => {
//   const userId = getUserId();
//   const userApiId = await getUserApiId();

//   createRoot(document.getElementById('root')).render(
//     <ThemeProvider theme={theme}>
//       <Router>
//         <AppBar position="static">
//           <Toolbar>
//             <Button color="inherit" component={Link} to="/">Search Movies</Button>
//             <Button color="inherit" component={Link} to="/my-movies">My Movies</Button>
//           </Toolbar>
//         </AppBar>
//         <Routes>
//           <Route
//             path="/"
//             element={<SearchMovies userId={userId} guestUserId={userApiId} />}
//           />
//           <Route
//             path="/my-movies"
//             element={<MyMovies userId={userId} guestUserId={userApiId} />}
//           />
//         </Routes>
//       </Router>
//     </ThemeProvider>,
//   );
// };

// renderApp();


// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import { AppBar, Toolbar, Button } from '@material-ui/core';
// import SearchMovies from './components/SearchMovies';
// import MyMovies from './components/MyMovies';

// const theme = createTheme();

// const generateGuestUserId = () => {
//   return `guest-${Math.floor(Math.random() * 100000)}`;
// };

// const fetchNewGuestId = async () => {
//   const response = await fetch('http://localhost:3001/new_guest');
//   const { guest_session_id } = await response.json();
  
//   return guest_session_id;
// };

// const initialState = {
//   userId: '',
//   userApiId: ''
// };

// export const UserContext = createContext(initialState);

// const userReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_USER_IDS':
//       return {
//         ...state,
//         userId: action.payload.userId,
//         userApiId: action.payload.userApiId
//       };
//     default:
//       return state;
//   }
// };

// const getUserIds = async (dispatch) => {
//   const userId = localStorage.getItem('userId') || generateGuestUserId();
//   const storageKey = `api_id_${userId}`;
//   let userApiId = localStorage.getItem(storageKey);

//   if (!userApiId) {
//     userApiId = await fetchNewGuestId();
//     localStorage.setItem(storageKey, userApiId);
//   }

//   dispatch({ type: 'SET_USER_IDS', payload: { userId, userApiId } });
// };

// const App = () => {
//   const [state, dispatch] = useReducer(userReducer, initialState);

//   useEffect(() => {
//     getUserIds(dispatch);
//   }, []);

//   return (
//     <UserContext.Provider value={state}>
//       <ThemeProvider theme={theme}>
//         <Router>
//           <AppBar position="static">
//             <Toolbar>
//               <Button color="inherit" component={Link} to="/">Search Movies</Button>
//               <Button color="inherit" component={Link} to="/my-movies">My Movies</Button>
//             </Toolbar>
//           </AppBar>
//           <Routes>
//             <Route
//               path="/"
//               element={<SearchMovies userId={userId} guestUserId={userApiId} />}
//             />
//             <Route
//               path="/my-movies"
//               element={<MyMovies userId={userId} guestUserId={userApiId} />}
//             />
//           </Routes>
//         </Router>
//       </ThemeProvider>
//     </UserContext.Provider>
//   );
// };

// const renderApp = () => {
//   createRoot(document.getElementById('root')).render(
//     <App />,
//   );
// };

// renderApp();


import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import SearchMovies from './components/SearchMovies';
import MyMovies from './components/MyMovies';
import { UserProvider } from './context/UserContext';

const theme = createTheme();

const renderApp = async () => {
  createRoot(document.getElementById('root')).render(
    <UserProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">Search Movies</Button>
              <Button color="inherit" component={Link} to="/my-movies">My Movies</Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route
              path="/"
              element={<SearchMovies />}
            />
            <Route
              path="/my-movies"
              element={<MyMovies />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </UserProvider>
  );
};

renderApp();
