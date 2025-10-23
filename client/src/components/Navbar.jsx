import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useAuthContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <div className='w-full flex flex-col'>
      {/* Promo Banner */}
      <div className='text-base w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center py-2 font-bold animate-pulse'>
        🚀 Crazy Promo: Sign up today and get your first link page FREE! Limited time only! 🚀
      </div>

      {/* Main Navbar */}
      <div className='w-full p-6 bg-white border-b-2 border-slate-100 flex justify-between items-center mx-auto'>
        <div className='text-xl md:text-2xl font-bold'>
          <Link to='/'>TapToSee.Me</Link>
        </div>

        {/* Desktop Nav */}
        {!user ? (
          <ul className='hidden md:flex gap-8 font-medium'>
            <li><Link to='/' className='hover:text-blue-600 transition-colors'>Home</Link></li>
            <li><Link to='/features' className='hover:text-blue-600 transition-colors'>Features</Link></li>
            <li><Link to='/pricing' className='hover:text-blue-600 transition-colors'>Pricing</Link></li>
            <li><Link to='/about' className='hover:text-blue-600 transition-colors'>About</Link></li>
            <li><Link to='/auth/register' className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition-all'>Sign Up</Link></li>
          </ul>
        ) : (
          <div className='hidden md:flex gap-4'>
            <Link to={`/dashboard/${user.username}`} className='hover:text-blue-600'>Dashboard</Link>
            <Link to={`${user.username}`} className='hover:text-blue-600'>Profile</Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        <div className='md:hidden flex items-center text-2xl cursor-pointer' onClick={toggleMenu}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Dropdown - FULL WIDTH */}
      {mobileOpen && (
        <div className='text-sm w-full bg-white border-b flex flex-col font-medium py-4 px-6 animate-slideDown z-50 md:hidden'>
          {!user ? (
            <>
              <Link to='/' className='py-2 hover:text-blue-600' onClick={toggleMenu}>Home</Link>
              <Link to='/features' className='py-2 hover:text-blue-600' onClick={toggleMenu}>Features</Link>
              <Link to='/pricing' className='py-2 hover:text-blue-600' onClick={toggleMenu}>Pricing</Link>
              <Link to='/about' className='py-2 hover:text-blue-600' onClick={toggleMenu}>About</Link>
              <Link to='/auth/register' onClick={toggleMenu} className='mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 rounded-lg shadow hover:opacity-90 transition-all'>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to={`/dashboard/${user.username}`} onClick={toggleMenu} className='py-2 hover:text-blue-600'>
                Dashboard
              </Link>
              <Link to={`/${user.username}`} onClick={toggleMenu} className='py-2 hover:text-blue-600'>
                Profile
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
