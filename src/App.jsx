import './App.css'
import React, { useState } from 'react';
import Home from './pages/home/Home_page';
import Navbar from './components/home/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Verify from './pages/verify/Verify_page';
import Search from './pages/search/Search_page';
import Dashboard from './pages/dashboard/Dashboard_page';
import { LoginContext } from './contexts/LoginContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { AccountContext } from './contexts/AccountContext';
import Profile from './components/profile/Profile';
import Userdashboard from './components/dashboard/Userdashboard';
import SingleDashboard from './components/dashboard/SingleDashboard';
import BecomeADoxxer from './pages/become_a_doxxer/BecomeADoxxer'
import Notifications from './pages/notifications/Notifications';

function App() {
  const [login, setLoggedIn] = useState(false);
  const [account, setAccount] = useState({});
  const [signUpComp, setSignUpComp] = useState(false);
  const [loginComp, setLoginComp] = useState(false);

  const toggleSignUp = () => {
    setSignUpComp(true);
    setLoginComp(false);
  };

  const toggleLogin = () => {
    setLoginComp(true);
    setSignUpComp(false);
  };

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <LoginContext.Provider value={{ login, setLoggedIn }}>
        <BrowserRouter>
          <Navbar toggleSignUp={toggleSignUp} />
          <Routes>
            <Route path="/" element={<Home signUpComp={signUpComp} loginComp={loginComp} setLoginComp={setLoginComp} setSignUpComp={setSignUpComp} toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} />} />
            <Route path="/verify/:id" element={<Verify />} />
            <Route path="/search" element={<Search />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/dashboard/:contract_address" element={<SingleDashboard/>}/>
            <Route path="/Userdashboard/:id" element={<Userdashboard/>}/>
            <Route path="/become_a_doxxer" element={<BecomeADoxxer/>}/>
            <Route path="/Notifications" element={<Notifications/>}/>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
