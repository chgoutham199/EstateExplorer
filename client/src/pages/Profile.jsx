import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto' >
       <h1 className='text-center text-3xl  font-semibold my-7'> Profile</h1>
       <form className='flex flex-col gap-4'>
       <img src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />

          <input className =' rounded-lg  border p-3' id='username' type='text' placeholder='username'/>
          <input className =' rounded-lg  border p-3' id='email' type='text' placeholder='email'/>       
          <input className =' rounded-lg  border p-3' id='password' type='text' placeholder='password'/>      
          
        <button className=' bg-slate-700 text-white rounded-lg p-3 capitalize hover:opacity-90 disabled:opacity-75'>update</button>           
       </form>
       <div className='flex  justify-between mt-5'>
        
        <span className='text-red-700 cursor-pointer'> Delete Account</span>
        <span className='text-red-700 cursor-pointer'> Sign out </span>

       </div>
    </div>
  )
}
