import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { IoMdDownload } from "react-icons/io";

const Notifications = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:7000/api/getSuperUsersRequest')
      setData(response.data.result)
      console.log(response.data.result)
    })()
  },[])

  function truncateString(str, maxLength) {
    return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
  }

  const approveOrReject = (type) => {
    if(type === 'Approve') {
      
    }
  }

  return (
    <div  className='mt-[15em] h-screen flex flex-col items-center gap-20'>
    <div>
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
     <tbody className='text-left text-sm font-normal '>
    
      {data.map((dat,index) => (<tr className='h-[5em]  cursor-pointer border-b border-blue-200'>
        <th scope='col' className='px-6 py-3 bg-blue-200' >{dat.first_name}</th>
        <th scope='col' className='px-6 py-3'>{truncateString(dat.email_address, 30)}</th>
        <th scope='col' className='px-6 py-3 w-[20em] bg-blue-200' >{truncateString(dat.reason, 40)}</th>
        <th scope='col' className='px-6 py-3 hover:underline' ><a href={dat.github}>{dat.github}</a></th>
        <th scope='col' className='px-6 py-3 bg-blue-200' ><button className='text-blue-400 hover:underline flex items-center gap-3'>download cv <IoMdDownload /></button></th>
        <th scope='col' className='px-6 py-3 flex gap-5 mt-3' ><button className='text-blue-400 hover:underline flex'>Approve</button><button className='text-red-400 hover:underline'>Reject</button></th>
      </tr>))}
     
     </tbody>
 </table>
 </div>
 </div>
  )
}

export default Notifications