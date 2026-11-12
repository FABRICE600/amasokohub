'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <nav aria-label="Primary navigation" className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[80px]">
        <Link href="/" aria-label="Amasoko Hub home" className="flex shrink-0 items-center gap-3 no-underline">
          <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-[#0A2540] to-[#1B4965] text-xl font-extrabold text-white">A</span>
          <span className="hidden font-playfair text-xl font-extrabold text-[#0A2540] sm:inline">Amasoko Hub</span>
        </Link>
        
        <ul id="primary-navigation" className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 z-50 list-none flex-col items-start gap-4 bg-white px-6 py-5 shadow-md lg:static lg:flex lg:flex-row lg:items-center lg:gap-3 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-8`}>
          <li><Link onClick={() => setMenuOpen(false)} href="/dashboard?type=tender" className="relative text-sm font-medium text-gray-800 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#E67E22] after:content-[''] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Tenders</Link></li>
          <li><Link onClick={() => setMenuOpen(false)} href="/dashboard?type=job" className="relative text-sm font-medium text-gray-800 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#E67E22] after:content-[''] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Jobs</Link></li>
          <li><Link onClick={() => setMenuOpen(false)} href="/dashboard?type=investment" className="relative text-sm font-medium text-gray-800 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#E67E22] after:content-[''] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Investments</Link></li>
          <li><Link onClick={() => setMenuOpen(false)} href="/dashboard?type=alerts" className="relative text-sm font-medium text-gray-800 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#E67E22] after:content-[''] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Alerts</Link></li>
          <li><Link onClick={() => setMenuOpen(false)} href="/#about" className="relative text-sm font-medium text-gray-800 no-underline transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#E67E22] after:content-[''] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">About</Link></li>
        </ul>
        
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <form action="/dashboard" method="get" className="hidden items-center xl:flex">
            <label className="sr-only" htmlFor="site-search">Search opportunities</label>
            <input
              id="site-search"
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search opportunities..."
              className="w-56 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm transition-all duration-300 focus:border-[#1B4965] focus:outline-none focus:ring-2 focus:ring-[#1B4965]/20 xl:w-72"
            />
          </form>
          <Link href="/sign-in" aria-label="Log in to your account" className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-[#0A2540] transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540] sm:px-4">
            Log in
          </Link>
          <Link href="/register" className="whitespace-nowrap rounded-lg bg-[#E67E22] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#D97311] hover:shadow-md sm:px-4">
            Register
          </Link>
        </div>

        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer rounded-lg border-0 bg-transparent p-2 text-[#0A2540] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A2540] lg:hidden">
          <span aria-hidden="true" className="flex size-5 flex-col justify-center gap-1">
            <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
