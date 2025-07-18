import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <div className="overflow-x-auto mt-4">
  <table className="min-w-full table-auto text-sm text-left text-gray-400">
   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-4 py-3">Date Updated</th>
        <th className="px-4 py-3">Comment</th>
        <th className="px-4 py-3">Likes</th>
        <th className="px-4 py-3">Post ID</th>
        <th className="px-4 py-3">User ID</th>
        <th className="px-4 py-3">Delete</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((comment) => (
        <tr key={comment._id} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className="px-4 py-2">{new Date(comment.updatedAt).toLocaleDateString()}</td>
          <td className="px-4 py-2">{comment.content}</td>
          <td className="px-4 py-2">{comment.likes?.length || 0}</td>
          <td className="px-4 py-2 max-w-[150px] truncate" title={comment.postId}>
            {comment.postId}
          </td>
          <td className="px-4 py-2 max-w-[150px] truncate" title={comment.userId}>
            {comment.userId}
          </td>
          <td className="px-4 py-2">
            <button
              onClick={() => {
                setCommentIdToDelete(comment._id);
                setShowModal(true);
              }}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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
        <p>You have no comments yet!</p>
      )}

      {/* Custom Modal */}
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4'>
                <button
                  onClick={handleDeleteComment}
                  className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}