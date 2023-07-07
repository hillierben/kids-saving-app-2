import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from'./components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ParentPortal from './components/ParentPortal';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import { BrowserRouter } from 'react-router-dom';
import TokenContext from './contexts/Token';

function App() {
  const[pageSelector, setPageSelector] = React.useState("login");
  const[page, setPage] = React.useState(<Login />);
  const[loggedOut, setLoggedOut] = React.useState("")
  const[token, setToken] = React.useState('')
  const[user, setUser] = React.useState()

  return (
    <TokenContext.Provider value={{token, setToken, user, setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar 
            handlePage={e => setPageSelector(e)}
            setLoggedOut={e => setLoggedOut(e)}/>}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login setPageSelector={e => setPageSelector(e)}/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portal" element={<ParentPortal />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </TokenContext.Provider>
  );
}

export default App;
