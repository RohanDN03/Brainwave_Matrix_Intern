import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import About from './pages/About';

import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivatePoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPages from './pages/PostPages';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';



function App() {
  

  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
         <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/update-post/:postId' element={<UpdatePost/>} />
        </Route>
        
        <Route path='/projects' element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPages />} />
        
      </Routes>
      <Footer/>
      
    </BrowserRouter>
    
  )
}

export default App;
