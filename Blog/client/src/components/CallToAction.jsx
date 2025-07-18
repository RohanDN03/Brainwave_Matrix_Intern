
import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex border border-purple-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-3xl font-semibold'>
          Discover top stories in Finance, Technology, Sports & more!
        </h2>
        <p className='text-gray-500 my-3'>
          Stay ahead with insightful articles and trends across your favorite topics.
        </p>
        <a
          href='/'
          className='w-full'
        >
          <Button
            className="rounded-tl-xl rounded-bl-none rounded-br-xl w-full 
                        bg-gradient-to-r from-purple-500 to-pink-500 text-white
                        hover:opacity-90 transition"
            >
            Explore Our Blog
            </Button>
        </a>
      </div>
      <div className='flex-1 p-7'>
        <img 
          src='https://images.prismic.io/rocketmakers-website-next/ZiwPe93JpQ5PTN7N_sporttech.png?auto=format,compress' 
          alt='News and Blog Topics' 
          className='rounded-lg shadow-lg'
        />
      </div>
    </div>
  );
}