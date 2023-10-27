import React,{useEffect, useState} from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [response, setResponse] = useState([])
    const [strings, toStrings] = useState("")

    useEffect(()=> { 
        const fetchData = async () => {
            try {
            const response = await axios.get('http://localhost:7000/api/getVerify')
            setResponse(response.data.result)
            } catch(e) {
                console.error(e)
            }
        }
        fetchData()

    },[])

  return (
    <div  className='mt-[10em] h-screen justify-center flex'>
        <div>
        <table>
            <thead  class="text-left text-xs text-white uppercase bg-gray-50 rounded-t-md border-1 border-gray-100 dark:text-white">
                <tr>
                <th scope='col' className='px-6 py-3' >Project Name</th>
                <th scope='col' className='px-6 py-3'>Contract Address</th>
                <th scope='col' className='px-6 py-3'>Chain</th>
                <th scope='col' className='px-6 py-3'>Audited</th>
                <th scope='col' className='px-6 py-3'>Application date</th>
                <th scope='col' className='px-6 py-3'> Tier</th>
                </tr>
            </thead>
            <tbody className='text-left text-sm font-normal '>
                {response.map((data, index) => (<tr key={index} className='h-[5em] hover:bg-blue-50 cursor-pointer border-b border-blue-200'>
                    <th scope='col' className='px-6 py-3' >{data.name_of_project}</th>
                    <th scope='col' className='px-6 py-3' >{data.contract_address}</th>
                    <th scope='col' className='px-6 py-3' >{data.chain}</th>
                    <th scope='col' className='px-6 py-3' >{data.is_Audited === true ? "true" : "false"}</th>
                    <th scope='col' className='px-6 py-3' >{data.created_on}</th>
                    <th scope='col' className='px-6 py-3' >free</th>
                </tr>))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Dashboard