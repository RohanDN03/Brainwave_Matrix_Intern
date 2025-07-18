import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Rohan's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome to our Blog — a vibrant space where ideas come alive! This platform was built to share inspiring stories, practical insights, and the latest updates across a wide range of categories including <strong>Technology</strong>, <strong>Finance</strong>, <strong>Travel</strong>, <strong>Fashion</strong>, and <strong>Gaming</strong>.
            </p>

             <p>
              Whether you're a curious tech enthusiast, a budget-conscious saver, a travel junkie, a trend follower, or a gamer at heart — there's something here for everyone. We publish fresh content regularly to keep you informed, entertained, and engaged.
            </p>

            <p>
              We believe in building a strong community of curious minds. Feel free to leave comments, like posts, and join the conversation. Your insights and feedback make this blog better every day.
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}