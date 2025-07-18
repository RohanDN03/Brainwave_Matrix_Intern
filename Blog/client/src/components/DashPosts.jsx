


import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Button
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser?._id, currentUser?.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='md:mx-auto p-3'>
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
         <div className='hidden md:block overflow-x-auto scrollbar'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th className='px-6 py-3'>Date updated</th>
                    <th className='px-6 py-3'>Post image</th>
                    <th className='px-6 py-3'>Post title</th>
                    <th className='px-6 py-3'>Category</th>
                    <th className='px-6 py-3'>Delete</th>
                    <th className='px-6 py-3'>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {userPosts.map((post) => (
                    <tr key={post._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-6 py-4'>{new Date(post.updatedAt).toLocaleDateString()}</td>
                      <td className='px-6 py-4'>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className='w-20 h-10 object-cover bg-gray-500'
                          />
                        </Link>
                      </td>
                      <td className='px-6 py-4'>
                        <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                          {post.title}
                        </Link>
                      </td>
                      <td className='px-6 py-4'>{post.category}</td>
                      <td className='px-6 py-4'>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post._id);
                          }}
                          className='font-medium text-red-500 hover:underline cursor-pointer'
                        >
                          Delete
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <Link to={`/update-post/${post._id}`} className='text-teal-500 hover:underline'>
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>

          {/* Mobile stacked cards */}
          <div className='md:hidden flex flex-col gap-4'>
            {userPosts.map((post) => (
              <div key={post._id} className='border p-4 rounded-lg shadow'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='font-semibold'>{post.title}</h3>
                  <span className='text-sm text-gray-500'>{new Date(post.updatedAt).toLocaleDateString()}</span>
                </div>
                <img src={post.image} alt={post.title} className='w-full h-36 object-cover rounded mb-2' />
                <p className='text-sm text-gray-700 mb-2'>Category: <span className='font-medium'>{post.category}</span></p>
                <div className='flex justify-between'>
                  <Link className='text-teal-500 hover:underline' to={`/post/${post.slug}`}>
                    View
                  </Link>
                  <Link className='text-blue-500 hover:underline' to={`/update-post/${post._id}`}>
                    Edit
                  </Link>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    className='text-red-500 hover:underline cursor-pointer'
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </div>

          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='p-6 text-center'>
          <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
          <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
            Are you sure you want to delete this post?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeletePost}>
              Yes, I'm sure
            </Button>
            <Button color='gray' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}