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
  const list = "font-light hover:underline cursor-pointer"; 

  const LogOut = () => {
    setLoggedIn(false)
    navigate('/')
  }
  console.log(account.role)

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
        {login ? (<div className='flex items-center gap-2 cursor-pointer absolute right-[15em]' onMouseEnter={() => toggleAccountHover(true)} >
          <span className='flex items-center'>{account.first_name}<IoMdArrowDropdown/></span>
          {account.role === "Admin" && <img src="https://i.pinimg.com/564x/ba/d7/86/bad786dfe4f227555be6fa2484b0b9a3.jpg" className='w-10 h-10 rounded-full'></img>}
          {account.role === "user" && <img src="https://t4.ftcdn.net/jpg/00/73/21/11/240_F_73211193_D9zi1Y4DiSTjJ8rxPBPj0ihliPHAK00N.jpg" className='w-10 h-10 rounded-full'></img>}
          {accountHover ? (
            <div id='close' onMouseLeave={() => toggleAccountHover(false)} className='bg-white w-[15em] p-5 z-20 absolute top-[3.2em] shadow-sm border-1 border-slate-50'>
              <ul className='flex flex-col gap-5'>
                <Link to={`/profile/${account._id}`}><li className='hover:underline'>Profile</li></Link>
                {account.role != "Admin" && <Link to={`/Userdashboard/${account._id}`}><li className='hover:underline'>Dashboard</li></Link>}
                {account.role != "user" && <Link to={`/dashboard`}> <li className='hover:underline'>Dox projects</li></Link>}
               {account.role != "Admin" && <Link to={`/verify/${account._id}`}><li className='hover:underline'>Verify Project</li></Link>} 
               <Link to={`/Notifications`}><li>Notifications</li></Link>
               {account.role != "Admin" && <Link to={`/become_a_doxxer`}><li className='hover:underline'>Become a doxxer and earn</li></Link>}
                <li className='hover:underline' onClick={() => LogOut()}> Log out</li>
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
