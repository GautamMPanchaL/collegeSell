import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e)=>{
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
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
      setLoading(false);
      setError(data.message);
    }
    setLoading(false);
    navigate('/sign-in');
  } catch (error) {
    console.error("Error during fetch:", error.message);
  }
};

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Loading..." : "Sign Up"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have a account? 
        <Link to={"/sign-in"}>
          <span className='text-blue-700'> Sign in</span>
        </Link>
        </p>
      </div>
    </div>
  )
}
