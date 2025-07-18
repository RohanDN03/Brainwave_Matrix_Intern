import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-10 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl pt-10 text-center">
          Explore Ideas Across Finance, Tech, Travel & More
        </h1>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Dive into thought-provoking articles on finance trends, sports highlights,
          cutting-edge tech, travel destinations, fashion updates, and the latest
          in gaming. Whether you're here to learn, explore, or stay inspired,
          this blog covers it all — curated just for you.
        </p>
        <Link
          to="/search"
          className="text-sm sm:text-base text-teal-600 font-semibold hover:underline text-center"
        >
          Browse all blog posts →
        </Link>
        <div className="p-3 bg-amber-100 dark:bg-slate-700 rounded-lg shadow">
          <CallToAction />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-3">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
              Recent Posts
            </h2>
            <div className="flex flex-wrap justify-center gap-5">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to="/search"
              className="text-lg text-teal-600 hover:underline text-center"
            >
              See all blog posts →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
