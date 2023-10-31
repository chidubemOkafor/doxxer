import React,{useState,useContext} from 'react'
import { ethers } from 'ethers'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import {ImSpinner8} from 'react-icons/im'


const Verify = () => {
  const {login, setLoggedIn} = useContext(LoginContext)
  const [newSigner, setNewSigner] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [binaryData, setBinaryData] = useState('')
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false)

  const {id} = useParams()

  const [formData, setFormData] = useState({
    name_of_project: '',
    amount_of_team_members: 0,
    website_link: '',
    contract_address: '',
    deployer_address: '',
    twitter_profile_link: '',
    whitepaper: '',
    founders_image: '',
    co_founders_image: '',
    screenshot_of_your_website: '',
    is_Audited: false,
    chain: '',
    created_on: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const connect = async () => {
    if (window.ethereum === undefined) {
      setErrorText("MetaMask is not installed");
    } else {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setNewSigner(signer);
        setFormData({
          ...formData,
          deployer_address: signer.address,
          chain: (await provider.getNetwork()).name,
          created_on: new Date(),
        });
        setIsConnected(true);
        setErrorText(''); // Reset error message
      } catch (error) {
        setErrorText('Error connecting to wallet.');
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    setLoading(true)
    if (newSigner === null) {
      setErrorText('You are not connected');
    } else {
      console.log(formData)
      const response = await axios.post(`http://localhost:7000/api/postVerify/${id}`,formData)
      console.log(response.data);
    }
  } catch(error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
  };

  const handleOption = (e) => {
    const newValue = e.target.value === 'yes' ? true : false;
    setFormData({ ...formData, is_Audited: newValue });
  };

  const label = 'flex flex-col';
  const input = 'border-2 border-blue-500 rounded-md h-12 w-[25em] pl-5 text-xl placeholder:text-blue-300';

  if(!login) {
    return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <img className='w-[20em] h-[20em]' src='../../../public/fof.svg'/>
    </div>
        )
  }

  return (
   <>
   <div className='w-screen h-screen flex justify-center items-center'>
        <form className='flex gap-10 mt-[10em]' onSubmit={handleSubmit}>
            <div className='flex  flex-col gap-2'>
                <div className={label}>
                    <label>Name or Project <span className='text-red-500'>*</span></label>
                    <input className={input} type='text' name='name_of_project' value={formData.name_of_project} onChange={handleChange} required/>
                </div>

                <div className={label}>
                    <label>Amount of team members <span className='text-red-500'>*</span></label>
                    <input className={input} type='number' name='amount_of_team_members' value={formData.amount_of_team_members} onChange={handleChange} required/>
                </div>

                <div className={label}>
                    <label>Website link</label>
                    <input className={input} type='text' name='website_link' value={formData.website_link} onChange={handleChange} />
                </div>

                <div className={label}>
                    <label>Contract Address <span className='text-red-500'>*</span></label>
                    <input className={input} type='text' name='contract_address' value={formData.contract_address} onChange={handleChange} required/>
                </div>

                <div className={label}>
                    <label>Twitter Profile link <span className='text-red-500'>*</span></label>
                    <input className={input} type='text' name='twitter_profile_link' value={formData.twitter_profile_link} onChange={handleChange} required/>
                </div>
                {!loading ? <button className='w-full bg-blue-400 text-white rounded-md py-3 mt-5' type='submit'>Dox me</button>:<button className="bg-blue-400 rounded-md h-10 cursor-not-allowed flex justify-center items-center"><ImSpinner8 className='h-7 w-7 animate-spin text-white'/></button>}
            </div>
            <div>
                <div className={label}>
                <label class="block mb-2 text-sm font-medium" for="file_input">Whitepaper <span className='text-red-500'>*</span></label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    aria-describedby="file_input_help" 
                    id="file_input" 
                    type="file"
                    name='whitepaper'
                    value={formData.whitepaper} onChange={handleChange} required/>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PDF, PNG, JPG.</p>
                </div>

                <div className={label}>
                <label class="block mb-2 text-sm font-medium" for="file_input">Founder's image <span className='text-red-500'>*</span></label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    aria-describedby="file_input_help" 
                    id="file_input" 
                    type="file"
                    name='founders_image'
                    value={formData.founders_image} onChange={handleChange} required/>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>

                <div className={label}>
                <label class="block mb-2 text-sm font-medium" for="file_input">Co-founders image</label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                    aria-describedby="file_input_help" 
                    id="file_input" 
                    type="file"
                    name='co_founders_image'
                    value={formData.co_founders_image} onChange={handleChange}/>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>

                <div className={label}>
                    
                <label class="block mb-2 text-sm font-medium" for="file_input">Screenshot of your website </label>
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help" 
                    id="file_input" 
                    type="file"
                    name='Screenshot_of_your_website'
                    value={formData.Screenshot_of_your_website} onChange={handleChange}/>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            
                </div>

                <div className='flex flex-col text-start gap-4'>
                    <span> Audited? <span className='text-red-500'>*</span></span>
                    <div className='flex gap-5'>
                    <div className='flex items-center gap-2'>
                        <label>Yes</label>
                        <input className="w-7 h-7" type='radio' 
                        name='is_Audited'
                        value="yes"
                        checked={formData.is_Audited === true}
                        onChange={handleOption}/>
                    </div>
                    <div  className='flex items-center gap-2'>
                    <label>No</label>
                        <input className="w-7 h-7" type='radio' 
                        name='is_Audited'
                        value="no"
                        checked={formData.is_Audited === false}
                        onChange={handleOption}/>
                    </div>
                    </div>
    
                </div>
                <div className='flex flex-col'>
                    <label>connect with the deployer address<span className='text-red-500'>*</span></label>
                    {!loading ? <button className='bg-blue-400 rounded-md text-white py-3' onClick={()=> connect()}>Connect Wallet</button>: <button className="bg-blue-400 rounded-md h-10 cursor-not-allowed flex justify-center items-center"><ImSpinner8 className='h-7 w-7 animate-spin text-white'/></button>}
                    {isConnected ? <span className='text-red-500'>not connected</span> : <></>}
                </div>
            </div>
            
        </form>
        
    </div>
   </>
  )
}

export default Verify