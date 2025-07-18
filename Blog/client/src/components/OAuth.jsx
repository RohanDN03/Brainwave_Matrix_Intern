import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const auth =getAuth(app);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Button
  type="button"
  className="flex items-center justify-center w-full py-2 px-4 rounded-lg
             bg-gradient-to-r from-pink-500 to-purple-500 text-white
             font-semibold shadow hover:from-pink-600 hover:to-purple-600 transition"
             onClick={handleGoogleClick} >
  <AiFillGoogleCircle className="w-6 h-6 mr-2 "  />
    Continue with Google
    </Button>
  )
}


