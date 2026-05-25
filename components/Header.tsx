import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-1000 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[80px]">
        <a href="#" className="flex items-center gap-3 no-underline">
          <div className="w-11 h-11 bg-gradient-to-br from-[#0A2540] to-[#1B4965] rounded-lg flex items-center justify-center text-white font-extrabold text-xl">A</div>
          <span className="font-playfair text-xl font-extrabold text-[#0A2540]">Amasoko Hub</span>
        </a>
        
        <ul className="hidden md:flex gap-10 items-center list-none">
          <li><a href="#tenders" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Tenders</a></li>
          <li><a href="#jobs" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Jobs</a></li>
          <li><a href="#investments" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Investments</a></li>
          <li><a href="#alerts" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">Alerts</a></li>
          <li><a href="#about" className="no-underline text-gray-800 font-medium text-sm transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#E67E22] after:transition-all after:duration-300 hover:text-[#E67E22] hover:after:w-full">About</a></li>
        </ul>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
            <input 
              type="text" 
              placeholder="Search opportunities..." 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-72 text-sm bg-gray-50 transition-all duration-300 focus:outline-none focus:border-[#1B4965] focus:ring-2 focus:ring-[#1B4965]/20 focus:w-80"
            />
          </div>
          
          <button className="px-4 py-2 bg-[#E67E22] text-white font-semibold text-sm rounded-lg shadow-sm transition-all duration-300 hover:bg-[#D97311] hover:shadow-md hover:-translate-y-0.5">
            Sign In
          </button>
        </div>
        
        <button className="md:hidden bg-none border-none text-[#0A2540] text-2xl cursor-pointer">☰</button>
      </div>
    </nav>
  );
};

export default Header;