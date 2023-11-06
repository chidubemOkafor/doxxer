import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
  const input = "border-2 border-blue-500 rounded-l-md h-12 w-[25em] pl-5 text-xl placeholder:text-blue-300";
  const [searchText, setSearchText] = useState('');
  const [approved, setApproved] = useState([]);

const getApproved = async (searchText) => { // Pass searchText as a parameter
  try {
    const response = await axios.get(`http://localhost:7000/api/approvedProjects`, {
      params: { searchText }
    });
    console.log(response.data.result);
    setApproved(response.data.result);
  } catch (error) {
    console.error(error);
  }
};

const changeValue = (e) => {
  const searchTerm = e.target.value.toLowerCase(); // Make the search case-insensitive
  setSearchText(searchTerm);
  getApproved(searchTerm); // Pass the current searchTerm to the function
}

  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-screen justify-center mt-[15em]'>
        <form method='POST'>
          <div className='flex'>
            <input
              type='search'
              className={input}
              value={searchText}
              onChange={changeValue}
              placeholder='Contract address or project name'
            />
            <button className='bg-blue-500 rounded-r-md text-white px-10' type='submit'>
              Search
            </button>
          </div>
        </form>
      </div>
      <div className='w-[39.3em] px-6 py-5 mt-2'>
        {approved.length > 0 ? (
          approved.map((proj) => (
            <p className='py-5' key={proj._id}>
              {proj.contract_address} - {proj.name_of_project}
            </p>
          ))
        ) : (
          <p className='flex justify-center'>No matching projects found.</p>
        )}
      </div>
    </div>
  );
}

export default Search;
