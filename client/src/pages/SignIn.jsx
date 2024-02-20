import React ,{useState} from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/User/userSlice';
export default function SignIn() {
  const [formData,setFormData] = useState({});
  const {loading,error} =useSelector((state) =>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange = (event) => {
    return (
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      })
    );
  };
  console.log(formData);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
       dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await res.json();
      if (data.success ===false )
       {
        dispatch(signInFailure(data.message));
        return;
       }
       dispatch(signInSuccess(data));
       navigate("/");
      console.log(data);
    }
    catch (error) {
   dispatch(signInFailure(error.message));
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
  
       <input type="text" placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
       <input type="text" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>
      
       <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Loading....' : 'Sign In' }</button>

      </form>
      <div className='flex gap-2 mt-5'>
         Don't have an account ?
        <Link to={"/sign-up"}>
          <span className="text-blue-800" >Sign Up</span>
        </Link>
      </div>
      {error &&<p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}
