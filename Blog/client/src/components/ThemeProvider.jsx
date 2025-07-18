// import { useSelector } from 'react-redux';

// export default function ThemeProvider({ children }) {
//   const { theme } = useSelector((state) => state.theme);
//   return (
//     <div className={theme}>
//       <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
//         {children}
//       </div>
//     </div>
//   );
// }

import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="min-h-screen 
        bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        text-gray-700 dark:text-gray-200 
        transition-colors duration-50">
        {children}
      </div>
    </div>
  );
}