import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'

const Userdashboard = () => {
    const {login,setLoggedIn } = useContext(LoginContext)
    const [pendingResponse, setPendingResponse] = useState([])
    const [approvedResponse,setApprovedResponse] = useState([])
    const [strings, toStrings] = useState("")
    const {id} = useParams()
    useEffect(()=> { 
        if(!login) { 
            console.log('login first')
        } else {
        const fetchData = async () => {
            try {
            const response = await axios.get(`http://localhost:7000/api/verifyRequests/${id}`)
            setPendingResponse(response.data.result.pending)
            setApprovedResponse(response.data.result.approved)
            } catch(e) {
                console.error(e)
            }
        }
        fetchData()
        }
    },[])

    if(!login) {
        return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <img className='w-[20em] h-[20em]' src='../../../public/fof.svg'/>
        </div>
            )
      }
  return (
    <div  className='mt-[15em] h-screen flex flex-col items-center gap-20'>
        <div>
           <h1 className='mb-5'>PENDING PROJECTS</h1> 
        <table>
            {approvedResponse.length > 0 ?(<thead  class="text-left text-xs text-white uppercase bg-gray-50 rounded-t-md border-1 border-gray-100 dark:text-white">
                <tr>
                <th scope='col' className='px-6 py-3' >Project Name</th>
                <th scope='col' className='px-6 py-3'>Contract Address</th>
                <th scope='col' className='px-6 py-3'>Chain</th>
                <th scope='col' className='px-6 py-3'>Audited</th>
                <th scope='col' className='px-6 py-3'>Application date</th>
                <th scope='col' className='px-6 py-3'>Status</th>
                </tr>
            </thead>):<></>}
            {approvedResponse.length > 0 ?(<tbody className='text-left text-sm font-normal '>
                {pendingResponse?.map((data, index) => (<tr key={index} className='h-[5em] hover:bg-blue-50 cursor-pointer border-b border-blue-200'>
                    <th scope='col' className='px-6 py-3' >{data.name_of_project}</th>
                    <th scope='col' className='px-6 py-3' >{data.contract_address}</th>
                    <th scope='col' className='px-6 py-3' >{data.chain}</th>
                    <th scope='col' className='px-6 py-3' >{data.is_Audited === true ? "true" : "false"}</th>
                    <th scope='col' className='px-6 py-3' >{data.created_on}</th>
                    <th scope='col' className='px-6 py-3 flex items-center justify-center gap-2 mt-3' >{data.status}<div className='h-2 w-2 bg-yellow-500 rounded-full'/></th>
                </tr>))}
            </tbody>):<div className='flex justify-center items-center text-blue-300'>No Pending project</div>}
        </table>
        </div>

        <div>
           <h1 className='mb-5'>APROVED PROJECTS</h1> 
        <table>
            {approvedResponse.length > 0 ?(<thead class="text-left text-xs text-white uppercase bg-gray-50 rounded-t-md border-1 border-gray-100 dark:text-white">
                <tr>
                <th scope='col' className='px-6 py-3' >Project Name</th>
                <th scope='col' className='px-6 py-3'>Contract Address</th>
                <th scope='col' className='px-6 py-3'>Chain</th>
                <th scope='col' className='px-6 py-3'>Audited</th>
                <th scope='col' className='px-6 py-3'>Application date</th>
                <th scope='col' className='px-6 py-3'>Status</th>
                </tr>
            </thead>):<></>}
            {approvedResponse.length > 0 ?(<tbody className='text-left text-sm font-normal '>
                {approvedResponse.map((data, index) => (<tr key={index} className='h-[5em] hover:bg-blue-50 cursor-pointer border-b border-blue-200'>
                    <th scope='col' className='px-6 py-3' >{data.name_of_project}</th>
                    <th scope='col' className='px-6 py-3' >{data.contract_address}</th>
                    <th scope='col' className='px-6 py-3' >{data.chain}</th>
                    <th scope='col' className='px-6 py-3' >{data.is_Audited === true ? "true" : "false"}</th>
                    <th scope='col' className='px-6 py-3' >{data.created_on}</th>
                    <th scope='col' className='px-6 py-3 flex items-center justify-center gap-2 mt-3' >{data.status}<div className='h-2 w-2 bg-green-500 rounded-full'/></th>
                </tr>))}
            </tbody>):<div className='flex justify-center items-center text-blue-300'>No Approved project</div>}
        </table>
        </div>
    </div>
  )
}

export default Userdashboard