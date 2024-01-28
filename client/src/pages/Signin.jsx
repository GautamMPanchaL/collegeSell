import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { signInStart, sigInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({});
  const {loading, error } = useSelector(state => state.user);
  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(signInStart());
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
      setError(data.message);
    }
    dispatch(sigInSuccess(data));
    navigate('/');
  } catch (error) {
    dispatch(signInFailure(error));
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign In"}</button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account? 
        <Link to={"/sign-up"}>
          <span className='text-blue-700'> Sign Up</span>
        </Link>
        </p>
      </div>
    </div>
  )
}
