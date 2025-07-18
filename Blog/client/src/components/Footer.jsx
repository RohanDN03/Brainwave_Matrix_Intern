
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