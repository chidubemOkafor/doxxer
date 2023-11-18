import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { AccountContext } from '../../contexts/AccountContext';
import { IoMdDownload } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const {account} = useContext(AccountContext)
  const [pendingResponse, setPendingResponse] = useState([])
  useEffect(() => {
     const fetch = async() => {
      const response = await axios.get('http://localhost:7000/api/getSuperUsersRequest')
      setData(response.data.result)
      const pendingData = response.data.result
      const filterPending = pendingData.filter((pend) => pend.status === "pending")
      setPendingResponse(filterPending)
      console.log(response.data.result)
    }
    fetch()
  },[])

  function truncateString(str, maxLength) {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  }

  const approveOrReject = async(type, id) => {
    try {
      let requestData = {}
      if(type === 'Approve') {
        requestData = {status: "Approve"}
        console.log(requestData)
      } else if (type === 'Reject') {
        requestData = {status: "Reject"}
        console.log(requestData)
      } else {
        console.error("type does not exist")
      }
      const {_id} = account
      await axios.post(`http://localhost:7000/api/approveOrRejectDoxRequest/${id}`,{requestData,_id})
    } catch (error) {
      console.error(error)
    }
  }

  if(account.role != 'Admin') {
    setTimeout(() => {
    return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <img className='w-[20em] h-[20em]' src='../../../public/fof.svg'/>
    </div>
        )
      },5000)
      navigate("/")
  }

  return (
    <div  className='mt-[15em] h-screen flex flex-col items-center gap-20'>
    {pendingResponse.length > 0 ?<div>
    <h1 className='mb-5'>SUPER-USER APPLICATIONS</h1> 
<table>
      <thead  class="text-left text-xs text-white uppercase bg-gray-50 rounded-t-md border-1 border-gray-100 dark:text-white">
        <tr>
          <th scope='col' className='px-6 py-3 bg-blue-300'>Name</th>
          <th scope='col' className='px-6 py-3'>Gmail</th>
          <th scope='col' className='px-6 py-3 bg-blue-300' >Reason</th>
          <th scope='col' className='px-6 py-3'>Github</th>
          <th scope='col' className='px-6 py-3 bg-blue-300'>Cv</th>
          <th scope='col' className='px-6 py-3'>Status</th>
        </tr>
      </thead>
  <tbody className='text-left text-sm font-normal'>
    {pendingResponse.map((dat,index) => (<tr key={index} className='h-[5em]  cursor-pointer border-b border-blue-200'>
      <th scope='col' className='px-6 py-3 bg-blue-200' >{dat.first_name}</th>
      <th scope='col' className='px-6 py-3'>{truncateString(dat.email_address, 30)}</th>
      <th scope='col' className='px-6 py-3 w-[20em] bg-blue-200' >{truncateString(dat.reason, 40)}</th>
      <th scope='col' className='px-6 py-3 hover:underline' ><a href={dat.github}>{dat.github}</a></th>
      <th scope='col' className='px-6 py-3 bg-blue-200' ><button className='text-blue-400 hover:underline flex items-center gap-3'>download cv <IoMdDownload /></button></th>
      <th scope='col' className='px-6 py-3 flex gap-5 mt-3' ><button className='text-blue-400 hover:underline flex' type='submit' onClick={() => approveOrReject("Approve", dat._id)}>Approve</button><button className='text-red-400 hover:underline' type='submit' onClick={() => approveOrReject("Reject", dat._id)}>Reject</button></th>
    </tr>))}
     </tbody>
 </table>
 </div>: <div className='flex items-center justify-center h-[20em] uppercase text-blue-300'>you have no request</div>}
 </div>
  )
}

export default Notifications