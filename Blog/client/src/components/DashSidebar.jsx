


import {
    HiUser,
    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,
    HiAnnotation,
    HiChartPie,
  } from 'react-icons/hi';
  import { useEffect, useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import { signoutSuccess } from '../redux/user/userSlice';
  
  export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
  
    const handleSignout = async () => {
        try {
          const res = await fetch('http://localhost:3000/api/user/signout', {
            method: 'POST',
            credentials: 'include',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
  
    return (
      <div className="w-full md:w-56 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex flex-col space-y-2">
          {currentUser?.isAdmin && (
            <Link
              to="/dashboard?tab=dash"
              className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${tab === 'dash' || !tab ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            >
              <HiChartPie className="mr-2" /> Dashboard
            </Link>
          )}
          <Link
            to="/dashboard?tab=profile"
            className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${tab === 'profile' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
          >
            <HiUser className="mr-2" /> Profile
            <span className="ml-auto text-xs px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded">
              {currentUser?.isAdmin ? 'Admin' : 'User'}
            </span>
          </Link>
          {currentUser?.isAdmin && (
            <>
              <Link
                to="/dashboard?tab=posts"
                className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${tab === 'posts' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              >
                <HiDocumentText className="mr-2" /> Posts
              </Link>
              <Link
                to="/dashboard?tab=users"
                className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${tab === 'users' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              >
                <HiOutlineUserGroup className="mr-2" /> Users
              </Link>
              <Link
                to="/dashboard?tab=comments"
                className={`flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${tab === 'comments' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              >
                <HiAnnotation className="mr-2" /> Comments
              </Link>
            </>
          )}
          <button
            onClick={handleSignout}
            className="flex items-center p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
          >
            <HiArrowSmRight className="mr-2" /> Sign Out
          </button>
        </div>
      </div>
    );
  }