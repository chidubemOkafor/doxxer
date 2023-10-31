import React, { useContext, useState } from 'react';
import { LoginContext } from '../../contexts/LoginContext';
import { Link, useNavigate } from 'react-router-dom';
import { AccountContext } from '../../contexts/AccountContext';
import { IoMdArrowDropdown } from 'react-icons/io';

const Navbar = (prop) => {
  const navigate = useNavigate()
  const { account, setAccount } = useContext(AccountContext);
  const { login, setLoggedIn } = useContext(LoginContext);
  const [accountHover, toggleAccountHover] = useState(false);
  const list = "font-light hover:text-yellow-400 hover:font-semibold cursor-pointer"; 

  const Login = () => {
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className='flex flex-col items-center gap-5 bg-gray-50 pt-10 shadow-sm fixed top-0'>
      <div className='text-2xl font-bold'>DOXXER</div>
      <div className='w-screen items-center flex justify-center gap-9'>
        <ul className='flex gap-9'>
          <Link to="/"><li className={list}>Home</li></Link>
           <li className={list}>Doxed</li>
           <Link to="/search"><li className={list}>Search</li></Link>
          <Link to=""><li className={list}>Services</li></Link>
          {!login ? <li onClick={() => prop.toggleSignUp()} className={list}>Create free account</li> : <></>}
        </ul>
        {login ? (<div className='flex items-center gap-2 cursor-pointer' onMouseEnter={() => toggleAccountHover(true)} >
          <span className='flex items-center'>{account.first_name}<IoMdArrowDropdown/></span>
          <img src="https://t4.ftcdn.net/jpg/00/73/21/11/240_F_73211193_D9zi1Y4DiSTjJ8rxPBPj0ihliPHAK00N.jpg" className='w-10 h-10 rounded-full'></img>
          {accountHover ? (
            <div id='close' onMouseLeave={() => toggleAccountHover(false)} className='bg-white rounded-md border border-blue-200 p-5 z-20 absolute mt-[13em]'>
              <ul className='flex flex-col gap-5'>
                <Link to={`/profile/${account._id}`}><li className='hover:underline'>Profile</li></Link>
                <Link to={`/Userdashboard/${account._id}`}><li className='hover:underline'>Dashboard</li></Link>
                <Link to={`/dashboard`}> <li className='hover:underline'>Dox projects</li></Link>
               <Link to={`/verify/${account._id}`}><li className='hover:underline'>Verify Project</li></Link> 
                <li className='hover:underline'>Become a doxxer and earn</li>
                <li className='hover:underline' onClick={() => Login()}> Log out</li>
              </ul>
            </div>
          ) : <></>}
        </div>):<></>}
      </div>
      <div></div>
    </nav>
  );
}

export default Navbar;
