import React,{useState, useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { LoginContext } from '../../contexts/LoginContext'

const Profile = () => {
    const {id} = useParams()
    const { login, setLoggedIn } = useContext(LoginContext)
    const [userProfile, setUserProfile] = useState({})

    useEffect(()=> {
        const getProfile = async() => {
            const result = await axios.get(`http://localhost:7000/api/profile/${id}`)
            console.log("this is the:",result.data.result)
            setUserProfile(result.data.result)
        }
        getProfile()
    },[])

    if(!login) {
        return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <img className='w-[20em] h-[20em]' src='../../../public/fof.svg'/>
        </div>
            )
    }
  return (
    <div className='w-screen h-screen flex flex-col'>
        <div className='w-screen bg-blue-400 h-[20em] flex justify-center items-center'>
            <div className='bg-white p-10 absolute mt-[20em] shadow-md text-center rounded-md'>
                <p className='text-4xl font-bold'>{userProfile.first_name} {userProfile.last_name}</p>
                <p className='text-sm'>{userProfile.email_address}</p>
            </div>
        </div>
        <div className='mt-20 flex justify-center ' >
            <div className='w-[50em] flex flex-col justify-center gap-10'>
                <div className='shadow-md w-full p-5'>
                    <h1 className='text-xl mb-5'>Names</h1>
                    <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>first name</span>
                        <span className='font-semibold text-sm'>{userProfile.first_name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>last name</span>
                        <span className='font-semibold text-sm'>{userProfile.last_name}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>middle name</span>
                        <span className='font-semibold text-sm'>_</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>Preferred first name</span>
                        <span className='font-semibold text-sm'>_</span>
                    </div>
                    </div>
                </div>
                <div className='shadow-md w-full p-5'>
                    <h1 className='text-xl mb-5'>Contact</h1>
                    <div className='flex justify-between'>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>Email</span>
                        <span className='font-semibold text-sm'>{userProfile.email_address}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>wallet address</span>
                        <span className='font-semibold text-sm'>_</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>country</span>
                        <span className='font-semibold text-sm'>_</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-light text-sm'>Role</span>
                        <span className='font-semibold text-sm'>_</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile