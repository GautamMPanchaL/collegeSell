import { useRef, useState,useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
// import { resolve } from 'path';
// import { error } from 'console';
// import { url } from 'inspector';

export default function UpdateListing() {
      const {currentUser} = useSelector((state) => state.user);
      const [files,setFiles] =  useState([]);
        const params = useParams();
  const navigate = useNavigate();
  // console.log(files);
  const [formData,setFormData] = useState({
    imageUrls : [],
    name : '',
    description : '',
    regularPrice : 0,
    discountPrice : 0,
    offer : false,
  });
  const [formError,setFormError] = useState(false);
  const [formLoading,setFormLoading] = useState(false);

  const [imageUploadError,setImageUploadError] = useState(false);

  const [uploading,setUploading] = useState(false);
//   console.log(formData);
  useEffect(() =>{
    const fetchListing = async() => {
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success === false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchListing();
},[]);

  const handleImageSubmit = (e)=> {
    if(files.length>0 && files.length + formData.imageUrls.length<7){
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for(let i = 0;i<files.length;i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData,imageUrls: formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
      }).catch((err)=>{
        setImageUploadError("Image Upload Failed (2 MB max per image)");
        setUploading(false);
      });
    }
    else{
      setImageUploadError("you can only upload 7 images per listing");
      setUploading(false);
    }
  }
  const storeImage = async(file)=>{
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime()+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on(
        "state_changed",
        (snapshot) =>{
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log("Progress : "+{progress});
        },
        (error)=>{
          reject(error);
        }, 
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            resolve(downloadURL);
          });
        }
      );
    });
  }
  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i) => i!= index),
    })
  }
  const handleChange = (e) => {
    // console.log(e);
    if(e.target.id === 'offer'){
      setFormData({
        ...formData,
        [e.target.id] : e.target.checked
      })
    }
    else{
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      })
    }
    // console.log(formData);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.imageUrls.length<1) {
        return setFormError("You must upload at least 1 image.");
      }
      if(+formData.regularPrice<+formData.discountPrice){
        return setFormError("Discounted price must be less than Regular price.");
      }
      setFormLoading(true);
      setFormError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`,{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef : currentUser._id
        })
      });
      const data = await res.json();
      setFormLoading(false);
      if(data.success === false){
        setFormError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setFormError(error);
      setFormLoading(false);
    }
  }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Update Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg'
           id='name' maxLength='62'  minLength='5'  required onChange={handleChange} value={formData.name} />

          <input type='textarea' placeholder='Description' className='border p-3 rounded-lg'
           id='description' required onChange={handleChange} value={formData.description} />


            <div className='flex items-center gap-4 mx-auto'>
              <input type="checkbox" id='offer' onChange={handleChange} checked={formData.offer}
               className='p-3 border border-gray-300 rounded-lg w-4'/>
                <span> Offer</span>
            </div>
            
          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center gap-2'>
            <input type='number' id='regularPrice' min='1' max='100000' required onChange={handleChange} value={formData.regularPrice}
            className='p-3 border border-gray-300 rounded-lg'/>
            <div  className='flex flex-col items-center'>
              <p> Regular Price</p>
              <span className='text-xs'>(Rs. )</span>
            </div>
          </div>
          { formData.offer && 
          <div className='flex items-center gap-2'>
            <input type='number' id='discountPrice' min='1' max='100000' required onChange={handleChange} value={formData.discountPrice}
            className='p-3 border border-gray-300 rounded-lg'/>
            <div className='flex flex-col items-center'>
              <p> Discounted Price</p>
              <span className='text-xs'>(Rs. )</span>
            </div>
          </div>}

          </div>
        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The First image will be the cover (max 6)</span>
          </p>
          <div className='flex gap-4'>
            <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300' type='file' id='images' accept='image/*' multiple/>
            <button disabled={uploading} type='button' onClick={handleImageSubmit}  className='p-3 text-green-700 border-green-700
            rounded uppercase hover:shadow-lg disabled:opacty-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
          </div>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {
              formData.imageUrls.length>0 && formData.imageUrls.map((url,index) =>(
                <div key={url} className='flex justify-between p-3 border items-center'>
                  <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                  <button className='p-3 rounded-lg text-red-700 uppercase hover:opacity-75' type='button'
                  onClick={() => handleRemoveImage(index)} >Delete</button>
                </div>
              ))
            }
        <button disabled={formLoading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase
        hover:opacity-95 disabled:opacity-80'>{formLoading ? "Updating..." : "Update Listing"}</button>
        {formError && <p className='text-red-700 text-sm'>{formError}</p> }
        </div>
      </form>
    </main>
  );
}




