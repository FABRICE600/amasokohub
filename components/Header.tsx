'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-1000 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[80px]">
        <a href="#" className="flex items-center gap-3 no-underline">
          <div className="w-11 h-11 bg-gradient-to-br from-[#0A2540] to-[#1B4965] rounded-lg flex items-center justify-center text-white font-extrabold text-xl">A</div>
          <span className="font-playfair text-xl font-extrabold text-[#0A2540]">Amasoko Hub</span>
        </a>
        
        <ul className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center list-none absolute md:static top-20 left-0 right-0 bg-white px-6 py-5 md:p-0 shadow-md md:shadow-none`}>
          <li><a href="/dashboard?type=tender" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Tenders</a></li>
          <li><a href="/dashboard?type=job" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Jobs</a></li>
          <li><a href="/dashboard?type=investment" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Investments</a></li>
          <li><a href="/dashboard?type=alerts" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Alerts</a></li>
          <li><a href="/#about" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">About</a></li>
        </ul>
        
        <form action="/dashboard" className="flex items-center gap-2 sm:gap-3">
          <label className="sr-only" htmlFor="site-search">Search opportunities</label>
          <input
            id="site-search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search opportunities..."
            className="hidden px-4 py-2 border border-gray-200 rounded-lg w-56 lg:w-72 text-sm bg-gray-50 transition-all duration-300 focus:outline-none focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 md:block"
          />
          <Link href="/sign-in" className="px-3 py-2 text-[#0A2540] font-semibold text-sm rounded-lg transition-colors hover:bg-slate-100 sm:px-4">
            Sign in
          </Link>
          <Link href="/register" className="px-3 py-2 bg-[#E67E22] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-[#D97311] hover:shadow-md sm:px-4">
            Register
          </Link>
        </form>

        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="md:hidden bg-none border-none text-[#0A2540] text-2xl cursor-pointer">{menuOpen ? '×' : '☰'}</button>
      </div>
    </nav>
  );
};

export default Header;
