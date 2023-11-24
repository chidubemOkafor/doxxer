import React,{useState,useEffect} from 'react'
import axios from 'axios'


const Waitlist = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        const getEmail = async() => {
            const response = await axios.get('http://localhost:7000/api/getEmailsInWaitlist')
            setData(response.data.result)
        }
        getEmail()
    },[])
  return (
    <div  className='mt-[15em] h-screen flex flex-col items-center gap-20'>
    {data.length > 0 ?<div>
    <h1 className='mb-5'>Waitlist</h1> 
<table>
      <thead  class="text-left text-xs text-white uppercase bg-gray-50 rounded-t-md border-1 border-gray-100 dark:text-white">
        <tr>
          <th scope='col' className='px-6 py-3'>Gmail</th>
        </tr>
      </thead>
  <tbody className='text-left text-sm font-normal'>
    {data.map((dat,index) => (<tr key={index} className='h-[5em]  cursor-pointer border-b border-blue-200'>
      <th scope='col' className='px-6 py-3'>{dat.email}</th>
    </tr>))}
     </tbody>
 </table>
 </div>: <div className='flex items-center justify-center h-[20em] uppercase text-blue-300 '>no waitlist</div>}
 </div>
  )
}

export default Waitlist