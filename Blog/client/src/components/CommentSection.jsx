import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments([data, ...comments]);
        setComment('');
        setCommentError(null);
      }
    } catch (err) {
      setCommentError(err.message);
    }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) return navigate('/sign-in');
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, { method: 'PUT' });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map(c =>
          c._id === commentId ? { ...c, likes: data.likes, numberOfLikes: data.likes.length } : c
        ));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (comment, editedContent) => {
    setComments(comments.map(c => c._id === comment._id ? { ...c, content: editedContent } : c));
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    if (!currentUser) return navigate('/sign-in');
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, { method: 'DELETE' });
      if (res.ok) {
        setComments(comments.filter(c => c._id !== commentId));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img src={currentUser.profilePicture} alt='' className='h-5 w-5 rounded-full' />
          <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must be signed in to comment.
          <Link to='/sign-in' className='text-blue-500 hover:underline'>Sign In</Link>
        </div>
      )}

      {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
            <Button type='submit' className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
              Submit
            </Button>
          </div>
          {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
        </form>
      )}

      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-md shadow-md w-full max-w-md mx-3'>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mx-auto mb-4' />
              <h3 className='mb-4 text-lg text-gray-700 font-semibold'>
                Are you sure you want to delete this comment?
              </h3>
              <div className='flex justify-center gap-4 mt-6'>
                <Button color='red' onClick={() => handleDelete(commentToDelete)}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}