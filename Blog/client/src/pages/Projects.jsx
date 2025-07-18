import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto flex justify-center gap-8 items-center flex-col p-6'>
      <h1 className='text-4xl font-bold text-center'>Explore Our Projects</h1>
     <p className='text-lg text-gray-700 text-center max-w-3xl'>
        Discover a variety of unique and engaging projects across different domains like <strong>Technology</strong>, <strong>Finance</strong>, <strong>Travel</strong>, <strong>Fashion</strong>, and <strong>Gaming</strong>. Each project is crafted to inspire learning, creativity, and hands-on experience in real-world contexts.
      </p>
      <div className='w-full flex flex-col gap-6'>

        {/* Technology Section */}
        <section className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Technology Projects</h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            Explore projects like building web apps, automation tools, or data visualizations that sharpen your coding skills and keep you updated with the latest tech trends.
          </p>
        </section>

        {/* Finance Section */}
        <section className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Finance Tools</h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            From budgeting spreadsheets to investment trackers, learn how to create practical financial tools that promote better money management.
          </p>
        </section>

        {/* Travel Section */}
        <section className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Travel Projects</h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            Build itineraries, travel blogs, or interactive maps that help travelers discover destinations, plan trips, and share experiences.
          </p>
        </section>

        {/* Fashion Section */}
        <section className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Fashion Showcases</h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            Curate virtual fashion lookbooks, style guides, or trend-tracking dashboards that combine creativity with digital design.
          </p>
        </section>

        {/* Gaming Section */}
        <section className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Gaming Projects</h2>
          <p className='text-gray-700 dark:text-gray-300 mt-2'>
            Develop mini-games, game review sites, or leaderboards that bring the gaming community together and let your imagination run wild.
          </p>
        </section>

      </div>
      <CallToAction />
    </div>
  );
}