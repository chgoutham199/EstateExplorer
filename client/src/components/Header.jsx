import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='relative max-w-6xl mx-auto'>
        <div className='flex justify-between items-center p-3'>
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
              <span className='text-slate-500'>Estate</span>
              <span className='text-slate-700'>Explorer</span>
            </h1>
          </Link>
          <div className='hidden sm:flex items-center'> {/* Ensure header components are visible on larger screens */}
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center mr-5'>
              <input
                type="text"
                placeholder="Search.."
                className='bg-transparent focus:outline-none w-24 sm:w-64 mr-7'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><FaSearch className='text-slate-600' /></button>
            </form>
            <ul className='flex gap-6'>
              <li className='text-slate-700 hover:underline'>
                <Link to="/" onClick={closeMenu}>HOME</Link>
              </li>
              <li className='text-slate-700 hover:underline'>
                <Link to='/about' onClick={closeMenu}>ABOUT</Link>
              </li>
              <li className='text-slate-700 hover:underline'>
                <Link to='search?searchTerm=' onClick={closeMenu}>LISTINGS</Link>
              </li>
              <li className='text-slate-700 hover:underline'>
                <Link to='/Contact' onClick={closeMenu}>CONTACT</Link>
              </li>
              <li>
                <Link to='/profile' className='flex items-center text-slate-700 hover:underline' onClick={closeMenu}>
                  {currentUser ? (
                    <img
                      className='rounded-full h-7 w-7 object-cover'
                      src={currentUser.avatar}
                      alt='profile'
                    />
                  ) : (
                    <span className='bg-gray-500 text-white border border-slate-700 rounded-md flex py-1 px-2 hover:underline'>LOGIN / SIGNUP</span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
          <div className='sm:hidden'>
            {menuOpen ? (
              <FaTimes className='text-slate-700 text-xl cursor-pointer' onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars className='text-slate-700 text-xl cursor-pointer' onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>
        {/* Dropdown Menu */}
        <div className={`absolute top-full left-0 right-0 bg-white shadow-md py-2 px-4 sm:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className='flex flex-col gap-4'>
            <li className='text-slate-700 hover:underline'>
              <Link to="/" onClick={closeMenu}>HOME</Link>
            </li>
            <li className='text-slate-700 hover:underline'>
              <Link to='/About' onClick={closeMenu}>ABOUT</Link>
            </li>
            <li className='text-slate-700 hover:underline'>
              <Link to='/Contact' onClick={closeMenu}>CONTACT</Link>
            </li>
            <li>
              <Link to='/profile' className='flex items-center text-slate-700 hover:underline' onClick={closeMenu}>
                {currentUser ? (
                  <img
                    className='rounded-full h-7 w-7 object-cover'
                    src={currentUser.avatar}
                    alt='profile'
                  />
                ) : (
                  <span className='bg-gray-500 text-white border border-slate-700 rounded-md flex py-1 px-2 hover:underline'>LOGIN / SIGNUP</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
