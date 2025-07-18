
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user)
  const { theme } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm,setSearchTerm] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <header className="shadow-md bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="flex items-center justify-between px-6 py-3 md:px-8 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center space-x-2">
          <span className="px-2 py-1 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            dark:from-blue-800 dark:via-purple-900 dark:to-pink-800
            rounded-lg text-white transition-colors duration-500">
            Rohan's
          </span>
          <span className="text-black dark:text-white transition-colors duration-500">Blog</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center text-[16px] font-medium">
          <Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Home</Link>
          <Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition">About</Link>
          <Link to="/projects" className="hover:text-purple-600 dark:hover:text-purple-400 transition">Projects</Link>
        </div>

        {/* Search desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          onSubmit={handleSubmit} />

          <input
            
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-1 rounded-md 
                       border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       focus:outline-none focus:ring-2 focus:ring-purple-500
                       transition-colors duration-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
            
          />
       
        </div>

        {/* Theme toggle + User + Hamburger */}
        <div className='flex items-center gap-4'>
          <button
            className='w-10 h-10 hidden sm:flex border rounded-full 
                       dark:border-gray-600 border-gray-300 
                       items-center justify-center'
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </button>
              {currentUser ? (
                <Link to="/dashboard?tab=profile" className="relative">
                  {currentUser?.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
                                    flex items-center justify-center text-white font-bold text-xl select-none cursor-pointer">
                      {currentUser.username?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                </Link>
              ) : (
            <Link to='/sign-in'>
              <button className="px-3 py-1 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 dark:hover:bg-purple-900 dark:hover:text-purple-300 transition">
                Sign In
              </button>
            </Link>
          )}

          {/* Hamburger */}
          <button className="md:hidden ml-2 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white dark:bg-gray-900 transition-all duration-500">
          <div className="flex flex-col space-y-3 text-[16px] font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-purple-600 dark:hover:text-purple-400 transition">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-purple-600 dark:hover:text-purple-400 transition">About</Link>
            <Link to="/projects" onClick={() => setMenuOpen(false)} className="hover:text-purple-600 dark:hover:text-purple-400 transition">Projects</Link>
          </div>
          <div className="flex items-center relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-1 rounded-md 
                         border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 
                         text-gray-900 dark:text-gray-100 
                         focus:outline-none focus:ring-2 focus:ring-purple-500
                         transition-colors duration-500"
            />
          </div>
          <button
            onClick={() => {
              dispatch(toggleTheme());
              setMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-3 py-2 border border-purple-600 text-purple-600 rounded hover:bg-purple-50 dark:hover:bg-purple-900 dark:hover:text-purple-300 transition"
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />} <span className="ml-2">Toggle Theme</span>
          </button>
        </div>
      )}
    </header>
  );
}