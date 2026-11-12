import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="about" className="bg-[#0A2540] text-white pt-16 pb-8">
      <div className="container max-w-[1400px] mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-white/20 to-white/10 rounded-lg flex items-center justify-center text-white font-extrabold text-xl">A</div>
              <span className="font-playfair text-xl font-extrabold">Amasoko Hub</span>
            </div>
            <p className="text-gray-300 mb-6">
              Connecting businesses, government entities, and investors in Rwanda through verified opportunities.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social, index) => (
                <a key={index} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-300">
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Tenders', 'Jobs', 'Investments', 'About Us', 'Contact Us'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-[#E67E22] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              {['Construction', 'Information Technology', 'Agriculture', 'Healthcare', 'Education', 'Transportation'].map((category, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-[#E67E22] transition-colors duration-300">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-[#E67E22] mt-1">📍</span>
                <span className="text-gray-300">Kigali, Rwanda</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#E67E22]">📧</span>
                <span className="text-gray-300">info@amasokohub.rw</span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#E67E22]">📞</span>
                <span className="text-gray-300">+250 788 123 456</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 Amasoko Hub. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-[#E67E22] transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-[#E67E22] transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-[#E67E22] transition-colors duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
