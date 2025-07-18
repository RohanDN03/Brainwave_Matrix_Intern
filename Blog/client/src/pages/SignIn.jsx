import { Button, Label, TextInput, Spinner, Alert } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signInStart, signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r 
        from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 
        flex items-center justify-center p-5 transition-colors duration-500'>
      <div className='flex flex-col md:flex-row max-w-4xl w-full 
          bg-white dark:bg-gray-900 
          rounded-2xl shadow-xl overflow-hidden border 
          border-purple-300 dark:border-gray-700 
          transition-colors duration-500'>
        
        {/* Left */}
        <div className='flex-1 
          bg-gradient-to-br from-purple-500 to-pink-500 
          dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 
          p-8 text-white transition-colors duration-500'>
          <Link to='/' className='text-5xl font-bold mb-4'>
            Rohan's Blog
          </Link>
          <p className='text-sm'>
            Sign in to your account to explore the latest blogs and posts.
          </p>
        </div>
        
        {/* Right */}
        <div className='flex-1 p-8'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' className='text-gray-700 dark:text-gray-300' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                className='bg-gray-100 dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-black dark:text-gray-100 transition-colors'
              />
            </div>
            <div>
              <Label value='Your password' className='text-gray-700 dark:text-gray-300' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
                className='bg-gray-100 dark:bg-gray-800 
                    border-gray-300 dark:border-gray-600 
                    text-black dark:text-gray-100 transition-colors'
              />
            </div>
            <Button
              color='purple'
              outline
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth/>
            {errorMessage && (
              <p className='text-red-500 text-sm'>{errorMessage}</p>
            )}
          </form>

          <div className='flex gap-2 text-sm mt-5 text-gray-600 dark:text-gray-400'>
            <span>Don't have an account?</span>
            <Link to='/sign-up' className='text-purple-600 dark:text-purple-400 font-semibold'>
              Sign Up
            </Link>
          </div>
          
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}