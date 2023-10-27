import React from 'react'

const Hero = () => {
  return (
    <>
    <div className=' h-screen flex flex-col justify-center items-center'>
    <div className='text-5xl font-bold text-center w-[19em]'>Over $26 billion and counting has been lost to NFT, Cryptocurrency rug pulls</div>
    <h1 className='mt-5'> according to statistics you can't effectively protect yourself with DYOR(do your own research)</h1>
    <h1 className='text-2xl font-medium mt-10 cursor-pointer'> what do we do?</h1>
    <form className='bg-blue-500 rounded-md w-[40em] flex justify-center mt-5 z-10'>
        <input className='border-2  border-blue-500 rounded-l-md h-14 w-full pl-5 text-xl placeholder:text-blue-300' placeholder='johndoe@gmail.com' type='email'/>
        <button className='px-10 text-xl text-white w-[15em]' type='submit'> Join Waitlist</button>
    </form>
    <div className='absolute w-[100%] z-0 bottom-0'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L34.3,176C68.6,160,137,128,206,144C274.3,160,343,224,411,229.3C480,235,549,181,617,133.3C685.7,85,754,43,823,64C891.4,85,960,171,1029,197.3C1097.1,224,1166,192,1234,202.7C1302.9,213,1371,267,1406,293.3L1440,320L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
</div>
    </div>
    </>
  )
}

export default Hero