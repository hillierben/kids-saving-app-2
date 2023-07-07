import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

import Dashboard from'./components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ParentPortal from './components/ParentPortal';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';

function App() {
  const[pageSelector, setPageSelector] = React.useState("login");
  const[page, setPage] = React.useState(<Login />);
  const[loggedOut, setLoggedOut] = React.useState("")



  return (
    <Routes>
      <Route 
        path={"/"} 
        element={<Navbar handlePage={e => setPageSelector(e)} 
        setLoggedOut={e => setLoggedOut(e)} />} >
        <Route path={"login"} element={<Login />} />
        <Route path={"register"} element={<Register setPageSelector={setPageSelector} />} />
        <Route path={"dashboard"} element={<Dashboard />} />
        <Route path={"portal"} element={<ParentPortal />} />
        <Route path={"*"} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
