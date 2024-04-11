import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'> Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input type='text' placeholder='Name' className='border p-3 rounded-lg'
           id='name' maxLength='62'  minLength='5'  required />
          <input type='textarea' placeholder='Description' className='border p-3 rounded-lg'
           id='description'  required />


          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center gap-2'>
            <input type='number' id='regularPrice' min='1' max='10' required
            className='p-3 border border-gray-300 rounded-lg'/>
            <div  className='flex flex-col items-center'>
              <p> Regular Price</p>
              <span className='text-xs'>(Rs. )</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <input type='number' id='discountPrice' min='1' max='10' required
            className='p-3 border border-gray-300 rounded-lg'/>
            <div className='flex flex-col items-center'>
              <p> Discounted Price</p>
              <span className='text-xs'>(Rs. )</span>
            </div>
          </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images:
          <span className='font-normal text-gray-600 ml-2'>The First image will be the cover (max 6)</span>
          </p>
          <div className=''>
            <input className='p-3 border border-gray-300' type='file' id='images' accept='image/*' multiple/>
            <button className='p-3 text-green-700 border-green-700
            rounded uppercase hover:shadow-lg disabled:opacty-80'>Upload</button>
          </div>
        <button className='p-3 bg-slate-700 text-white rounded-lg uppercase
        hover:opacity-95 disabled:opacity-80'>Create Listing</button>
        </div>
      </form>
    </main>
  );
}