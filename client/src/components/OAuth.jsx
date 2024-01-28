// // src/components/OAuth.js
// import React from 'react';
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from "../firebase.js";
// import { useDispatch } from 'react-redux';
// import { sigInSuccess } from "../redux/user/userSlice.js";

// function OAuth() {
//   const dispatch = useDispatch();

//   const handleGoogleClick = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       const auth = getAuth(app);
//       const result = await signInWithPopup(auth, provider);

//       const res = await fetch("http://localhost:3000/api/auth/google", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json"
//         },
//         body: JSON.stringify({
//           name: result.user.displayName,
//           email: result.user.email,
//           photo: result.user.photoURL
//         }),
//       });

//       if (!res.ok) {
//         console.error("Server returned an error:", res.status, res.statusText);
//         // Handle the error appropriately
//         return;
//       }

//       const data = await res.json();
//       dispatch(sigInSuccess(data));

//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <button type="button" onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>
//       Continue with Google
//     </button>
//   );
// }

// export default OAuth;

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { sigInSuccess} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:3000/api/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(sigInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}