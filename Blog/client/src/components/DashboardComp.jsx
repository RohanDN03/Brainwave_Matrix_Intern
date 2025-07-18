import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  const InfoCard = ({ title, value, icon, change }) => (
    <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-gray-500 text-md uppercase'>{title}</h3>
          <p className='text-2xl'>{value}</p>
        </div>
        {icon}
      </div>
      <div className='flex gap-2 text-sm'>
        <span className='text-green-500 flex items-center'>
          <HiArrowNarrowUp />
          {change}
        </span>
        <div className='text-gray-500'>Last month</div>
      </div>
    </div>
  );

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <InfoCard
          title='Total Users'
          value={totalUsers}
          change={lastMonthUsers}
          icon={<HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />}
        />
        <InfoCard
          title='Total Comments'
          value={totalComments}
          change={lastMonthComments}
          icon={<HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />}
        />
        <InfoCard
          title='Total Posts'
          value={totalPosts}
          change={lastMonthPosts}
          icon={<HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />}
        />
      </div>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 py-6'>
        {/* Recent Users */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden'>
          <div className='flex justify-between items-center px-5 py-4 border-b dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Users</h2>
            <Link
              to="/dashboard?tab=users"
              className='text-sm px-3 py-1 rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition'
            >
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm text-gray-700 dark:text-gray-300'>
              <thead className='bg-gray-100 dark:bg-gray-700 uppercase text-xs'>
                <tr>
                  <th className='px-5 py-3'>User</th>
                  <th className='px-5 py-3'>Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='border-b dark:border-gray-700'>
                    <td className='px-5 py-2'>
                      <img src={user.profilePicture} alt='user' className='w-10 h-10 rounded-full bg-gray-400' />
                    </td>
                    <td className='px-5 py-2'>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Comments */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden'>
          <div className='flex justify-between items-center px-5 py-4 border-b dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Comments</h2>
            <Link
              to="/dashboard?tab=comments"
              className='text-sm px-3 py-1 rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition'
            >
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm text-gray-700 dark:text-gray-300'>
              <thead className='bg-gray-100 dark:bg-gray-700 uppercase text-xs'>
                <tr>
                  <th className='px-5 py-3'>Comment</th>
                  <th className='px-5 py-3'>Likes</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id} className='border-b dark:border-gray-700'>
                    <td className='px-5 py-2 max-w-[250px] truncate' title={comment.content}>
                      {comment.content}
                    </td>
                    <td className='px-5 py-2'>{comment.likes?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Posts */}
        <div className='bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden'>
          <div className='flex justify-between items-center px-5 py-4 border-b dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-white'>Recent Posts</h2>
            <Link
              to="/dashboard?tab=posts"
              className='text-sm px-3 py-1 rounded-md text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition'
            >
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-sm text-gray-700 dark:text-gray-300'>
              <thead className='bg-gray-100 dark:bg-gray-700 uppercase text-xs'>
                <tr>
                  <th className='px-5 py-3'>Image</th>
                  <th className='px-5 py-3'>Title</th>
                  <th className='px-5 py-3'>Category</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className='border-b dark:border-gray-700'>
                    <td className='px-5 py-2'>
                      <img src={post.image} alt='post' className='w-14 h-10 object-cover rounded-md bg-gray-400' />
                    </td>
                    <td className='px-5 py-2 max-w-[250px] truncate' title={post.title}>
                      {post.title}
                    </td>
                    <td className='px-5 py-2'>{post.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}