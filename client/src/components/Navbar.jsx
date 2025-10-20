import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='w-full flex flex-col'>
      {/* Promo Banner */}
      <div className='w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white text-center py-2 font-bold animate-pulse'>
        🚀 Crazy Promo: Sign up today and get your first link page FREE! Limited time only! 🚀
      </div>

      {/* Main Navbar */}
      <div className='w-full p-6 bg-white border-b-2 border-slate-100 flex justify-between items-center  mx-auto'>
        <div className='text-2xl font-bold'>
          <Link to='/'>TapToSee.Me</Link>
        </div>
        <ul className='flex gap-8 font-medium'>
          <li><Link to='/' className='hover:text-blue-600 transition-colors'>Home</Link></li>
          <li><Link to='/features' className='hover:text-blue-600 transition-colors'>Features</Link></li>
          <li><Link to='/pricing' className='hover:text-blue-600 transition-colors'>Pricing</Link></li>
          <li><Link to='/about' className='hover:text-blue-600 transition-colors'>About</Link></li>
          <li><Link to='/auth/register' className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition-all'>Sign Up</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
