import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full p-6 border-b-2 border-slate-100 bg-white flex justify-center'>
        <div className='font-medium'>
            <Link to='/'>TapToSee.Me</Link>
        </div>
    </div>
  )
}

export default Navbar