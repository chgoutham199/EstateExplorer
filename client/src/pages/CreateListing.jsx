import React from "react";
import {useState} from 'react';
import {getStorage,getDownloadURL,ref,uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Createlisting from '../images/Createlisting.jpg';
import Upload from '../images/Upload.jpg';
const CreateListing = () => {
  const {currentUser}=useSelector((state)=>state.user);
  const [files,setFiles]=useState([]);
  // console.log(files);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:50,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  });
 const [imageUploadError, setImageUploadError]=useState(false);
 const [uploading,setUploading]=useState(false);
  console.log(formData);
  const handleImageSubmit=(e)=>{
    if(files.length>0 && files.length + formData.imageUrls.length<7){
      setUploading(true);
      setImageUploadError(false);
        const promises=[];
        for(let i=0;i<files.length;i++){
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises)
         .then((urls)=>{
          setFormData({
            ...formData,imageUrls:formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err)=>{
          setImageUploadError('Image upload failed(2 mb max per image)');
          setUploading(false);
        });
    }else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
  const storeImage=async(file)=>{
    return new Promise((resolve,reject)=>{
          const storage=getStorage(app);
          const fileName=new Date().getTime()+file.name;
          const storageRef=ref(storage,fileName);
          const uploadTask=uploadBytesResumable(storageRef,file);
          uploadTask.on(
            "state_changed",
            (snapshot)=>{
              const progress=
              (snapshot.bytesTransferred/snapshot.totalBytes)*100;
              console.log(`Upload is ${progress}% done`);
            },
            (error)=>{
              reject(error);
            },
            ()=>{
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                resolve(downloadURL);
              });
            }
          );

    });
  };
  const handleRemoveImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
    });
  };
  const handleChange=(e)=>{
    if(e.target.id==='sale' || e.target.id==='rent'){
      setFormData({
        ...formData,
        type:e.target.id
    });

    }
    if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked,
      });
    }
    if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value,
      });
    }
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if(formData.imageUrls.length<1) return setError('You must upload atleast one image')
      if(+formData.regularPrice<+formData.discountPrice) return setError('Discount price must be lower than regular price')
      setLoading(true);
      setError(false);
      const res= await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          ...formData,
          userRef:currentUser._id,
      }),
    });
    // if(!res.ok){
    //   throw new Error(res.statusText);
    // }
      const data=await res.json();
      setLoading(false);
      if(data.success===false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  };
  return (
<main className="p-3 mx-auto">
<div class="max-w-4xl w-full mx-auto flex items-center text-black" style={{height:"500px"}}>
        <div class="flex flex-col px-9">
          <h1 className='xl:text-5xl font-serif font-medium xl:mb-5'>Welcome to EstateExplorer</h1><br/>
          <p className="font-medium text-xl">Here you can create your own listings for sale.</p>
        </div>
        <img class="h-full w-full py-2 ml-5" src={Createlisting} style={{width:"400px"}}></img>
      </div>
      <div className='flex flex-col px-3 mx-auto max-w-6xl'>
        <h1 className="text-3xl font-semibold">Enter Your Listing Details</h1><br/>
        <div className="flex items-center">
          <div className="w-full mx-auto flex items-center text-black rounded-lg">
            <div className="flex flex-col px-9">
              <form onSubmit={handleSubmit} className="flex flex-col">
              
                  <label><h1 className='text-2xl font-serif mb-2'>Listing Name:</h1></label>
                  <div className="border-black mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="outline-none w-full text-black font-bold border-b-2 border-solid border-black"
                      style={{ width: '550px' }}
                      id="name"
                      maxLength="100"
                      minLength="3"
                      required
                      onChange={handleChange}
                      value={formData.name}
                    />
              
                </div>
                {/* Email input */}
                <label><h1 className='text-2xl font-serif mb-2'>Description:</h1></label>
                <div className="border-black mb-4">
                  <textarea
                    type="text"
                    placeholder="Description"
                    className="outline-none w-full text-black font-bold border-b-2 border-solid border-black"
                    style={{ width: '550px' }}
                    id="description"
                    maxLength="100"
                    minLength="10"
                    required
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>
                {/* Phone number input */}
                <label><h1 className='text-2xl font-serif mb-2'>Address:</h1></label>
                <div className="border-black mb-4">
                  <input
                    type="text"
                    placeholder="Address"
                    className="outline-none w-full text-black font-bold border-b-2 border-solid border-black"
                    style={{ width: '550px' }}
                    id="address"
                    maxLength="100"
                    minLength="10"
                    required
                    onChange={handleChange}
                    value={formData.address}
                  />
                </div>
      
                <div className="flex flex-col flex-1 gap-4">
                  
                  <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChange}
              checked={formData.type==='sale'}/>
              <span className='text-2xl font-serif'>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange}
              checked={formData.type==='rent'}/>
              <span className='text-2xl font-serif'>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" onChange={handleChange}
            checked={formData.parking}/>
              <span className='text-2xl font-serif'>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" onChange={handleChange}
            checked={formData.furnished}/>
              <span className='text-2xl font-serif'>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" onChange={handleChange}
            checked={formData.offer}/>
              <span className='text-2xl font-serif'>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className='text-2xl font-serif'>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="border p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}   
              />
              <p className='text-2xl font-serif'>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                className="border p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-colitems-center gap-2">
                <p className='text-2xl font-serif'>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="100000000"
                className="border p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-colitems-center gap-2">
                <p className='text-2xl font-serif'>Discounted Price</p>
                {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
              </div>
              
            </div>
            )}
  
          <div className="flex gap-4 border border-black p-4">
            <div className="flex flex-col">
          <h1 className="text-3xl font-semibold mb-4">Images: </h1>
                    <input className='mb-4' onChange={(e) => setFiles(e.target.files)} type="file" id="images" accept='image/*' multiple />
                    <button type='button' disabled={uploading} onClick={handleImageSubmit} className="bg-green-700 p-2 hover:shadow-lg disabled:opacity-80 text-white">{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <img src={Upload}></img>
                  </div>
          </div>
    
                  <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                  {/* Display uploaded images */}
                  {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                      <div key={url} className="flex justify-between p-3 border items-center">
                        <img src={url} alt='listing image' className="w-20 h-20 object-contain rounded-lg" />
                        <p>Choose maximum of 6 files</p>
                        <button type='button' onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
                      </div>
                    ))
                  }
                  <button disabled={loading || uploading} style={{width:'350px'}}className="ml-56 py-3 w-auto font-medium bg-sky-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Creating...' : 'Create Listing'}</button>
                  {error && <p className="text-red-700 text-sm">{error}</p>}
                  <br/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default CreateListing;