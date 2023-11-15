import React,{useState,useEffect,useContext} from 'react'
import { AccountContext } from '../../contexts/AccountContext'
import axios from 'axios'
import {ImSpinner8} from 'react-icons/im'


const BecomeADoxxer = () => {
    const { account, setAccount } = useContext(AccountContext)
    const [loading, setLoading] = useState(false)
    const [pending, setPending] = useState(false)
    const [propSend, setPropSent] = useState(false)
    const [value, setValues] = useState({
        reasonValue: "",
        gitHubLink: "",
        cv: "",
        id: account._id,
        firstName: account.first_name,
        email: account.email_address
    })

    const changeValue = (e) => {
        const {name, value} = e.target
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }
      
    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            setLoading(true)
            // i need to check if the user already has a pending project before i proceed. 
            // 1. if the user has a pending request then i can not proceed unless it is concluded.
            // this is where i send the json data to the backed then i can prevent the user from sending again
            const response = await axios.post('http://localhost:7000/api/requestSuperUserRole', {reqDoxMessage: value })
            if(response) {
                setTimeout(() => {
                    setPropSent(false)
                },4000)
                setPropSent(true)
            }
        } catch (error) {
            if(error.response.data.message === "Resource already exists") {
                setTimeout(() => {
                    setPending(false)
                },4000)
                setPending(true)
            } else {
                console.error(error)
            } 
        } finally {
            setLoading(false)
        }  
    }

  return (
    <div className='h-screen flex flex-col items-center justify-center mt-20'>
        {pending && (<div className='absolute top-0 mt-[10em]'>
            <div className='bg-blue-400 w-[27em] text-white py-5 flex justify-center items-center uppercase font-bold'>you have a pending transaction</div>
            <div className='bg-blue-300 h-1' style={{width: 432}}/>
        </div>)}
        
        {propSend && (<div className='absolute top-0 mt-[10em]'>
            <div className='bg-green-400 w-[27em] text-white py-5 flex justify-center items-center uppercase font-bold'>your approval has been sent</div>
            <div className='bg-green-300 h-1' style={{width: 432}}/>
        </div>)}
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-3'>
                <label>Your reason to become a doxxer <span className='text-red-500'>*</span></label>
                <textarea value = {value.reasonValue} name ="reasonValue" onChange={changeValue} className='w-[27em] p-2 border-blue-300 border outline-none' required/>
            </div>
            <div className='flex flex-col gap-3'>
                <label>Github Profile link <span className='text-red-500'>*</span></label>
                <input value = {value.gitHubLink} name='gitHubLink' onChange={changeValue} type='text' className='h-10 p-2 border-blue-300 border outline-none' required/>
            </div>
            <div className='flex flex-col gap-3'>
                <label>Cv <span className='text-red-500'>*</span></label>
                <input value = {value.cv} name='cv' type='file' onChange={changeValue} required/>
            </div>
           <button type='submit' className='bg-blue-400 py-2 text-white flex justify-center items-center'>{!loading ? 'Submit a proposal' : <ImSpinner8 className='h-7 w-7 animate-spin text-white'/>}</button>
        </form>
    </div>
  )
}

export default BecomeADoxxer