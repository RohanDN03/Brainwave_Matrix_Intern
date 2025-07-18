// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
// import {
//   Footer,
//   FooterCopyright,
//   FooterDivider,
//   FooterIcon,
//   FooterLink,
//   FooterLinkGroup,
//   FooterTitle
// } from 'flowbite-react';

// export default function FooterCom() {
//   return (
//     <Footer container className='border border-t-8 border-teal-500'>
//       <div className='w-full max-w-7xl mx-auto'>
//         <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
//           <div className='mt-5'>
//             <Link
//               to='/'
//               className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
//             >
//               <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//                 Rohan's
//               </span>
//               <span className='text-white'>Blog</span>
//             </Link>
//           </div>
//           <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
//             <div>
//               <FooterTitle title='About' />
//               <FooterLinkGroup col>
//                 <FooterLink
//                   href='https://www.100jsprojects.com'
//                   target='_blank'
//                   rel='noopener noreferrer'
//                 >
//                   100 JS Projects
//                 </FooterLink>
//                 <FooterLink
//                   href='/about'
//                   target='_blank'
//                   rel='noopener noreferrer'
//                 >
//                   Rohan's Blog
//                 </FooterLink>
//               </FooterLinkGroup>
//             </div>
//             <div>
//               <FooterTitle title='Follow us' />
//               <FooterLinkGroup col>
//                 <FooterLink
//                   href='https://github.com/RohanDN03/Brainwave_Matrix_Intern'
//                   target='_blank'
//                   rel='noopener noreferrer'
//                 >
//                   Github
//                 </FooterLink>
//                 <FooterLink href='#'>Discord</FooterLink>
//               </FooterLinkGroup>
//             </div>
//             <div>
//               <FooterTitle title='Legal' />
//               <FooterLinkGroup col>
//                 <FooterLink href='#'>Privacy Policy</FooterLink>
//                 <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
//               </FooterLinkGroup>
//             </div>
//           </div>
//         </div>
//         <FooterDivider />
//         <div className='w-full sm:flex sm:items-center sm:justify-between'>
//           <FooterCopyright
//             href='#'
//             by="Rohan's blog"
//             year={new Date().getFullYear()}
//           />
//           <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
//             <FooterIcon href='#' icon={BsFacebook} />
//             <FooterIcon href='#' icon={BsInstagram} />
//             <FooterIcon href='#' icon={BsTwitter} />
//             <FooterIcon href='https://github.com/RohanDN03/Brainwave_Matrix_Intern' icon={BsGithub} />
//             <FooterIcon href='#' icon={BsDribbble} />
//           </div>
//         </div>
//       </div>
//     </Footer>
//   );
// }



import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle
} from 'flowbite-react';

export default function FooterCom() {
  return (
    <Footer container className='bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-gray-300 rounded-t-3xl mt-8'>
      <div className='w-full max-w-7xl mx-auto px-6 py-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          <div>
            <Link
              to='/'
              className='text-2xl font-bold text-white hover:text-teal-400 transition duration-300'
            >
              <span className='px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-lg'>
                Rohan's
              </span> Blog
            </Link>
            <p className='mt-4 text-sm text-gray-400'>
              Sharing code, projects & tutorials.
            </p>
          </div>
          <div>
            <FooterTitle title='Resources' className='text-teal-400' />
            <FooterLinkGroup col>
              <FooterLink href='https://www.100jsprojects.com' target='_blank' rel='noopener noreferrer' className='hover:text-teal-300 transition'>
                100 JS Projects
              </FooterLink>
              <FooterLink href='/about' className='hover:text-teal-300 transition'>
                About Blog
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title='Follow' className='text-teal-400' />
            <FooterLinkGroup col>
              <FooterLink href='https://github.com/RohanDN03/Brainwave_Matrix_Intern' target='_blank' rel='noopener noreferrer' className='hover:text-teal-300 transition'>
                Github
              </FooterLink>
              <FooterLink href='#' className='hover:text-teal-300 transition'>
                Discord
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>

        <FooterDivider className='my-8 border-teal-500' />

        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <FooterCopyright
            href='/'
            by="Rohan's Blog"
            year={new Date().getFullYear()}
            className='text-gray-400'
          />
          <div className='flex space-x-5'>
            <FooterIcon href='#' icon={BsFacebook} className='hover:text-teal-400 transition' />
            <FooterIcon href='#' icon={BsInstagram} className='hover:text-teal-400 transition' />
            <FooterIcon href='#' icon={BsTwitter} className='hover:text-teal-400 transition' />
            <FooterIcon href='https://github.com/RohanDN03/Brainwave_Matrix_Intern' icon={BsGithub} className='hover:text-teal-400 transition' />
            <FooterIcon href='#' icon={BsDribbble} className='hover:text-teal-400 transition' />
          </div>
        </div>
      </div>
    </Footer>
  );
}