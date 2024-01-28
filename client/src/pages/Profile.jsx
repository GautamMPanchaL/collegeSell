import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable} from "firebase/storage"
import { app } from '../firebase';
export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state)=>state.user);
  const [file, setFile] = useState(undefined);
  useEffect(()=>{
    if(file){
      handleFileUpload();
    }
  }, [file]);
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state-change', (snapshot) => {
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
    })
  }
  return (
    <div className='p-3 max-w-lg mx-auto center'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange = {(e)=>setFile(e.target.files[0])} type='file'  ref={fileRef} className='' hidden accept='image/*'/>
        <img src={currentUser.avatar} alt='Profile' onClick={()=>fileRef.current.click()}
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-80 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}
