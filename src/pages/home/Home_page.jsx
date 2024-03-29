import React,{useState, useRef,useEffect, useContext} from 'react'
import Hero from '../../components/home/Hero'
import About from '../../components/home/About'
import {AiOutlineClose} from 'react-icons/ai'
import { LoginContext } from '../../contexts/LoginContext'
import axios from 'axios'
import { AccountContext } from '../../contexts/AccountContext'
import { app, auth } from '../../../firebase_config/firebaseConfig'
import {ImSpinner8} from 'react-icons/im'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'


const Home_page = (prop) => {
  const { login, setLoggedIn } = useContext(LoginContext)
  const { account, setAccount } = useContext(AccountContext)
  const ref = useRef()
  const input_style = 'pl-2 h-10 w-[20em] bg-blue-50 border border-blue-200 rounded-md placeholder:text-blue-300'
  const [incorrectPassword, setIncorrectPassword] = useState(false)
  const [emailExists, setEmailExists] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [accountDoestExist, setAccountDoestExist] = useState(false) 
  const [loading, setLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false)
  const [accountData, setAccountData] = useState({
    first_name : '',
    last_name :'',
    email_address :'',
    password: '' 
  })

  const [loginDetails, setLoginDetails] = useState({
    email_address: '',
    user_password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
    setSignupLoading(true)
    const userCredential = await createUserWithEmailAndPassword(auth, accountData.email_address, accountData.password)
    const user = userCredential.user

    if(!user) {
      console.log('something happend')
    } else {
    const firebaseAccountId = user.uid
    console.log(user.uid)

    const result = await axios.post('http://localhost:7000/api/createAccount', {accountData, firebaseAccountId})
    if(result.data.message == "failed") {
      setLoginSuccess(false)
      setEmailExists(true)
    }
    else if(result.data.message == "success"){
      setTimeout(async() => {
        setLoginSuccess(true)
        setEmailExists(false)
        setLoggedIn(true)
        console.log({...result.data.result, email_address: user.email})
        setAccount({...result.data.result, email_address: user.email})
      },0)

      setTimeout(() => {
        prop.setSignUpComp(false)
        setLoginSuccess(false)
        setAccountData({
          first_name: "",
          last_name: "",
          email_address: "",
          password: ""
        })
      },1000) 
    }
    }
  } catch (error) {
    console.log(error.code)
    if (error.code === 'auth/wrong-password') {
      setIncorrectPassword(true);
    } else if (error.code === 'auth/user-not-found') {
      setAccountDoestExist(true);
    } else if (error.code === 'auth/email-already-in-use') {
      setEmailExists(true);
    }

    setLoginSuccess(false);
  } finally {
    setSignupLoading(false)
  }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { email_address, user_password } = loginDetails;
      const userCredential = await signInWithEmailAndPassword(auth, email_address, user_password);
      const user = userCredential.user;
      console.log(userCredential)
      if (user) {
         const result = await axios.get(`http://localhost:7000/api/login/${user.uid}`)
        if(result.data.message === 'failed') {
          console.log('internal server')
        } else if (result.data.message === 'success') {
          setLoggedIn(true);
          setAccount(result.data.result);
          setLoginSuccess(true);
          setIncorrectPassword(false);
          setAccountDoestExist(false);

        setTimeout(() => {
          prop.setLoginComp(false);
          setLoginDetails({
            email_address: '',
            user_password: '',
          });
        }, 1000);
      }
    }
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setIncorrectPassword(true);
      } else if (error.code === 'auth/user-not-found') {
        setAccountDoestExist(true);
      }
      setLoginSuccess(false);
    } finally {
      setLoading(false)
    }
  };

  const handleChangeLogin = (e) => {
    const {name, value} = e.target
    setLoginDetails((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  return (
    <>
    <Hero/>
  
{ prop.signUpComp ? (<div className="fixed inset-0 flex items-center justify-center z-30">
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="bg-white p-10 rounded-md relative z-10" ref={ref}>
    <p className="absolute top-3 right-3 cursor-pointer">
      <AiOutlineClose onClick={() => prop.setSignUpComp(false)}/>
    </p>
    <form className="flex flex-col gap-3 text-sm" onSubmit={handleSubmit}>
      {emailExists ?<div className='bg-red-400 h-10 text-white rounded-md shadow-md flex justify-center items-center'>email exists</div>: <></>}
      {loginSuccess ?<div className='bg-green-400 h-10 text-white rounded-md shadow-md flex justify-center items-center'>Account created</div>: <></>}
      <div className="flex flex-col">
        <label>First Name</label>
        <input
          type="text"
          placeholder="ex: john"
          className={input_style}
          name = "first_name"
          value = {accountData.first_name}
          onChange = {handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="ex: Doe"
          className={input_style}
          name = "last_name"
          value = {accountData.last_name}
          onChange = {handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label>Email address</label>
        <input
          type="email"
          placeholder="ex: john.doe@gmail.com"
          className={input_style}
          name = "email_address"
          value = {accountData.email_address}
          onChange = {handleChange}
          required
        />
      </div>
      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          className={input_style}
          name = "password"
          value={accountData.password}
          onChange = {handleChange}
          required
        />
      </div>
      <div className="flex gap-2 items-center">
        <input type="checkbox" className="rounded-md" required/>
        <p className="text-sm">I accept the <span>Terms of Service</span></p>
      </div>
     {!signupLoading ? (<button className="bg-blue-400 text-white rounded-md h-10" type='submit'>
        Create Account
      </button>) : <button className="bg-blue-400 rounded-md h-10 cursor-not-allowed flex justify-center items-center"><ImSpinner8 className='h-7 w-7 animate-spin text-white'/></button>}
      <div className="flex justify-between mt-4">
        <p>Already have an account?</p>
        <p className='cursor-pointer' onClick={prop.toggleLogin}>Sign in</p>
      </div>
    </form>
    </div>
    </div>): <></>
}
{prop.loginComp ? (<div className="fixed inset-0 flex items-center justify-center z-30">
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="bg-white p-10 rounded-md relative z-10" ref={ref}>
    <p className="absolute top-3 right-3 cursor-pointer">
      <AiOutlineClose onClick={() => prop.setLoginComp(false)}/>
    </p>
    <form className="flex flex-col gap-3 text-sm" onSubmit={handleLoginSubmit}>
    {incorrectPassword ?<div className='bg-red-400 h-10 text-white rounded-md shadow-md flex justify-center items-center'>password incorrect</div>: <></>}
    {accountDoestExist ?<div className='bg-red-400 h-10 text-white rounded-md shadow-md flex justify-center items-center'>account does not exist</div>: <></>}
    {loginSuccess ?<div className='bg-green-400 h-10 text-white rounded-md shadow-md flex justify-center items-center'>logged in</div>: <></>}
      <div className="flex flex-col">
        <label>Email address</label>
        <input
          type="email"
          placeholder="ex: john.doe@gmail.com"
          className={input_style}
          onChange={handleChangeLogin}
          name= 'email_address'
          value={loginDetails.email_address}
          required
        />
      </div>
      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          placeholder="ex: john.doe@gmail.com"
          className={input_style}
          onChange={handleChangeLogin}
          name="user_password"
          value = {loginDetails.user_password}
          required
        />
      </div>
      <div className="flex gap-2 items-center">
        <input type="checkbox" className="rounded-md" required/>
        <p className="text-sm">Trust this device for 60 days</p>
      </div>
      {!loading ? (<button className="bg-blue-400 text-white rounded-md h-10" type='submit'>
        Sign in
      </button>) : <button className="bg-blue-400 rounded-md h-10 cursor-not-allowed flex justify-center items-center"><ImSpinner8 className='h-7 w-7 animate-spin text-white'/></button>}
      <div className="flex justify-between mt-4">
        <p>Forgot password?</p>
        <p className='cursor-pointer' onClick={prop.toggleSignUp}>Recover password</p>
      </div>
      <div className="flex justify-between mt-4">
        <p>Don't have an account?</p>
        <p className='cursor-pointer' onClick={prop.toggleSignUp}>Sign up</p>
      </div>
    </form>
    </div>
    </div>): <></>}
    </>
  )
}

export default Home_page