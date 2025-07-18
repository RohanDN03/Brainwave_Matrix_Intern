// import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation } from 'react-icons/hi';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { signoutSuccess } from '../redux/user/userSlice';
// import { useDispatch, useSelector } from 'react-redux';

// export default function DashSidebar() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const [tab, setTab] = useState('');

//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get('tab');
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
//   }, [location.search]);

//   const itemClass = (active) =>
//     `flex items-center gap-2 p-2 rounded transition-colors duration-200 
//      ${active 
//        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold' 
//        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
//      }`;

//   return (
//     <div className="bg-white dark:bg-gray-800 h-full w-full md:w-56 p-4 transition-colors duration-300">
//       <div className="flex flex-col gap-2">
//         <Link to="/dashboard?tab=profile" className={itemClass(tab === 'profile')}>
//           <HiUser className="text-xl" />
//           <span>{currentUser.isAdmin ? 'Admin' : 'User'}Profile</span>
//         </Link>

//         <Link to="/dashboard?tab=posts" className={itemClass(tab === 'posts')}>
//           <HiDocumentText className="text-xl" />
//           <span>Posts</span>
//         </Link>

//         <Link to="/dashboard?tab=comments" className={itemClass(tab === 'comments')}>
//           <HiAnnotation className="text-xl" />
//           <span>Comments</span>
//         </Link>

//         <Link to="/dashboard?tab=users" className={itemClass(tab === 'users')}>
//           <HiOutlineUserGroup className="text-xl" />
//           <span>Users</span>
//         </Link>

//         <button
//           onClick={() => dispatch(signoutSuccess())}
//           className="flex items-center gap-2 p-2 rounded text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
//         >
//           <HiArrowSmRight className="text-xl" />
//           <span>Sign Out</span>
//         </button>
//       </div>
//     </div>
//   );
// }




// import { Sidebar } from 'flowbite-react';
// import {
//   HiUser,
//   HiArrowSmRight,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiAnnotation,
//   HiChartPie,
// } from 'react-icons/hi';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { signoutSuccess } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';

// export default function DashSidebar() {
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { currentUser } = useSelector((state) => state.user);
//   const [tab, setTab] = useState('');
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get('tab');
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
//   }, [location.search]);
//   const handleSignout = async () => {
//     try {
//       const res = await fetch('/api/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <Sidebar className='w-full md:w-56'>
//       <Sidebar.Items>
//         <Sidebar.ItemGroup className='flex flex-col gap-1'>
//           {currentUser && currentUser.isAdmin && (
//             <Link to='/dashboard?tab=dash'>
//               <Sidebar.Item
//                 active={tab === 'dash' || !tab}
//                 icon={HiChartPie}
//                 as='div'
//               >
//                 Dashboard
//               </Sidebar.Item>
//             </Link>
//           )}
//           <Link to='/dashboard?tab=profile'>
//             <Sidebar.Item
//               active={tab === 'profile'}
//               icon={HiUser}
//               label={currentUser.isAdmin ? 'Admin' : 'User'}
//               labelColor='dark'
//               as='div'
//             >
//               Profile
//             </Sidebar.Item>
//           </Link>
//           {currentUser.isAdmin && (
//             <Link to='/dashboard?tab=posts'>
//               <Sidebar.Item
//                 active={tab === 'posts'}
//                 icon={HiDocumentText}
//                 as='div'
//               >
//                 Posts
//               </Sidebar.Item>
//             </Link>
//           )}
//           {currentUser.isAdmin && (
//             <>
//               <Link to='/dashboard?tab=users'>
//                 <Sidebar.Item
//                   active={tab === 'users'}
//                   icon={HiOutlineUserGroup}
//                   as='div'
//                 >
//                   Users
//                 </Sidebar.Item>
//               </Link>
//               <Link to='/dashboard?tab=comments'>
//                 <Sidebar.Item
//                   active={tab === 'comments'}
//                   icon={HiAnnotation}
//                   as='div'
//                 >
//                   Comments
//                 </Sidebar.Item>
//               </Link>
//             </>
//           )}
//           <Sidebar.Item
//             icon={HiArrowSmRight}
//             className='cursor-pointer'
//             onClick={handleSignout}
//           >
//             Sign Out
//           </Sidebar.Item>
//         </Sidebar.ItemGroup>
//       </Sidebar.Items>
//     </Sidebar>
//   );
// }


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