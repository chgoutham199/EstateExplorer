import {useState,useEffect,useRef} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase.js';
import {updateUserStart,updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess} from  '../redux/User/userSlice.js';
export default function Profile() {
  const dispatch=useDispatch();
  const fileRef=useRef(null);
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const [file,setFile]=useState(undefined);
  const [percentage,setPercentage] = useState(0);
  const [fileError,setFileError] = useState(false);
  const [formData,setFormData]= useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  console.log(formData);
  // firebase storage
  // allow read;
  // allow write: if request.resource.size< 2 * 1024 * 1024   &&
  // request.resource.contentType.matches('image/.*');
  useEffect(()=>{
      if(file)
      {
        handleFileUpload(file);
      
      }
    },[file]
  );  
   const handleFileUpload=(file)=>
   {
       const storage=getStorage(app);
       const fileName=new Date().getTime() +file.name;
       const storageRef= ref(storage,fileName);
       const uploadTask= uploadBytesResumable(storageRef,file);
       uploadTask.on("state_changed",(snapshot)=>{
       const progress=(snapshot.bytesTransferred /snapshot.totalBytes)*100;
       setPercentage(Math.round(progress));

      },
       (error)=>
       {
              setFileError(true);
      
       },
       ()=>{

        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) =>
          {
            setFormData({...formData,avatar:downloadURL})
          }
        )
       }, )
      };
      const handleChange= (e)=>
      {
               setFormData({...formData,[e.target.id]:e.target.value});
      };
      const handleSubmit=async(e)=>
      {     
           e.preventDefault();
           try { 
            dispatch(updateUserStart());
            const res= await fetch(`/api/user/update/${currentUser._id}`,
            {
                method:'POST',
                headers :{
                  'Content-Type':'application/json',
                },
                body:JSON.stringify(formData),
            });
            const data=await res.json();
            if  (data.success === false)
            {
              dispatch(updateUserFailure(data.message))
              return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
           } catch (error) {
             dispatch(updateUserFailure(error.message));
           }
      };
      const handleDeleteUser = async ()=>
      {
            try {
              dispatch(deleteUserStart());
              const res= await fetch(`/api/user/delete/${currentUser._id}`,
              {
                   method:'DELETE',      
              });
              const data = await res.json();
              if (data.success === false)
              {
                     dispatch(deleteUserFailure(data.message));
                     return ;
              }
              dispatch(deleteUserSuccess(data));

            } catch (error) {
               dispatch(deleteUserFailure(error.message));
            }
      };
    const handleSignOut= async()=>
    {
             try {
                      dispatch(signOutUserStart());
                      const res=  await fetch('/api/auth/signout') ;  
                      const data = res.json();
                     
                      if (data.success===false)
                      {
                          dispatch(signOutUserFailure(data.message));
                          return;
                      }   
                      dispatch(signOutUserSuccess(data));               
             } catch (error) {
                console.log(error);
                dispatch(signOutUserFailure(error.message));
             }
    };
  return (
    <div className='p-3 max-w-lg mx-auto' >
       <h1 className='text-center text-3xl  font-semibold my-7'> Profile</h1>
       <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef}   hidden accept='image/*'/>
       <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
       <p className='text-sm self-center'> 
        {fileError ? <span className='text-red-700'>Error Uploading Image (size less than 2 Mb) </span>  :
          percentage >0 && percentage<100 ? <span className='text-slate-700'> Uploaded {percentage}% </span> : percentage===100 ?(<span className='text-green-700'>Image Sucessfully Uploaded</span>)
        : ""
       
       } 
       </p>
          <input className =' rounded-lg  border p-3' defaultValue={currentUser.username} onChange={handleChange} id='username' type='text' placeholder='username' />
          <input className =' rounded-lg  border p-3' defaultValue={currentUser.email} onChange={handleChange} id='email' type='text' placeholder='email'/>       
          <input className =' rounded-lg  border p-3' id='password' onChange={handleChange} type='password' placeholder='password'/>      
          
        <button disabled={loading} className=' bg-slate-700 text-white rounded-lg p-3 capitalize hover:opacity-90 disabled:opacity-75'>{loading ?'Loading...':'update'}</button>           
       </form>
       <div className='flex  justify-between mt-5'>
        
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}> Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}> Sign out </span>

       </div>
       <p className='text-red-700 mt-5'>{error ? error :''}</p>
       <p className='text-green-700 mt-5'>{updateSuccess ? 'Profile Updated Successfully!' : ''}</p>
    </div>
  )
}
