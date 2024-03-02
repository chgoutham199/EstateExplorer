import React ,{useState} from 'react';
import {Link ,useNavigate} from 'react-router-dom';
import Oauth from '../components/Oauth.jsx';
export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
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
      try {
      e.preventDefault();
     setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      const data = await res.json();
      if (data.success ===false )
       {
        setLoading(false);
        setError(data.message);
        return;
       }
       setLoading(false);
       setError(null);
       navigate("/sign-in");
      console.log(data);
    }
    catch (error) {
    setLoading(false);
    setError(error.message);
  }
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
      
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
       <input type="text" placeholder='username' className='border p-3 rounded-lg' id="username" onChange={handleChange}/>
       <input type="text" placeholder='email' className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
       <input type="password" placeholder='password' className='border p-3 rounded-lg' id="password" onChange={handleChange}/>
      
       <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 '>{loading ? 'Loading....' : 'Sign  up' }</button>
       
       <Oauth />
      </form>
      <div className='flex gap-2 mt-5'>
        Have an account ?
        <Link to={"/sign-in"}>
          <span className="text-blue-800" >Sign in</span>
        </Link>
      </div>
      {error &&<p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}
