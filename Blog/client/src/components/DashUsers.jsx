import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='overflow-x-auto p-4'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3'>Date created</th>
                <th className='px-6 py-3'>User image</th>
                <th className='px-6 py-3'>Username</th>
                <th className='px-6 py-3'>Email</th>
                <th className='px-6 py-3'>Admin</th>
                <th className='px-6 py-3'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <td className='px-6 py-4'>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='px-6 py-4'>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                  </td>
                  <td className='px-6 py-4'>{user.username}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 text-center py-4'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className='text-center'>You have no users yet!</p>
      )}

      {/* PURE TAILWIND MODAL */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white rounded-lg shadow-lg w-96 p-6 dark:bg-gray-800'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mx-auto mb-4' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this user?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeleteUser}
                  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                >
                  Yes, delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
