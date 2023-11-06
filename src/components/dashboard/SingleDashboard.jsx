import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {BsFillPencilFill} from 'react-icons/bs'
import {GoQuestion} from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

const SingleDashboard = () => {
    const navigate = useNavigate()
    const adj = 'flex gap-[10em] py-3'
    const title = 'text-blue-400 flex gap-2 items-center w-[10em]'
    const top_layer = 'border-b border-blue-100'
    const {contract_address} = useParams()
    const [data, setData] = useState('')

    useEffect(() => {
        const getData = async() => {
            console.log(contract_address)
            const response = await axios.get(`http://localhost:7000/api/getVerifyData/${contract_address}`)
                setData(response.data.result)
                console.log(response.data.result)
        }
        getData()
    },[])

    const handleAction = async (status) => {
        try {
          let requestData = {};
          if (status === "approved") {
            requestData = { status: "approved" };
          } else if (status === "rejected") {
            requestData = { status: "rejected" };
          } else {
            console.error("Invalid status provided.");
            return;
          }
          await axios.post(`http://localhost:7000/api/approveProject/${contract_address}`, requestData);
          navigate('/dashboard')
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <div className='h-[100vh] w-[100%] flex flex-col mt-[5em] items-center justify-center '>
            <div className='shadow-sm bg-gray-50 w-[80%] p-5'>
                <div className={top_layer}>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Name of Project:</p>
                        <p>{data.name_of_project}</p>
                    </div>
                </div>
                <div className={top_layer}>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Contract Address:</p>
                        <p>{data.contract_address}</p>
                    </div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Etherscan:</p>
                        <a href={`https://goerli.etherscan.io/address/${data.contract_address}`}>https://goerli.etherscan.io/address/{data.contract_address}</a>
                    </div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Chain:</p>
                        <p>{data.chain}</p>
                    </div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Deployer Address:</p>
                        <p>{data.deployer_address}</p>
                    </div>
                </div>
                <div className={top_layer}>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Twitter link:</p>
                        <a href={data.twitter_profile_link}>{data.name_of_project} twitter link</a>
                    </div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Website Link:</p>
                        <a href={data.website_link}>{data.website_link}</a>
                    </div>
                </div>
                <div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Audited:</p>
                        <p>{data.is_audited ? 'True' : 'False'}</p>
                    </div>
                    <div className={adj}>
                        <p className={title}><GoQuestion/>Team:</p>
                        <p>{data.amount_of_team_members}</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-end items-center gap-10 w-[80%]'>
                <p className='flex items-center gap-2 cursor-pointer py-3 mt-5 hover:underline'><BsFillPencilFill className='h-6 w-6'/> write bug report</p> 
                <button  className='hover:underline text-red-400 flex mt-5'>Reject</button>
                <button  className='hover:underline text-green-400 flex mt-5'>Reject with reason</button>
                <button  className='hover:underline text-blue-400 flex mt-5' onClick={() => handleAction("approved")}>DOXX</button>
            </div>
        </div>
    )
}

export default SingleDashboard