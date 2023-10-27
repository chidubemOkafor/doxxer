import React from 'react'

const Search = () => {
    const input = "border-2 border-blue-500 rounded-l-md h-12 w-[25em] pl-5 text-xl placeholder:text-blue-300"
  return (
<>
    <div className='flex w-screen justify-center mt-[15em]'>
        <form method='POST'>
            <div className='flex'><input type='search' className={input} placeholder='contract address of project name'/> <button className='bg-blue-500 rounded-r-md text-white px-10' type='submit'>Search</button></div>
        </form>

    </div>
</>
  )
}

export default Search