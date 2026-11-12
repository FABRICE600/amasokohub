import Link from 'next/link';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] to-[#1B4965] text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      
      <div className="container max-w-[1400px] mx-auto px-4 relative z-10 text-center">
        <h1 className="font-playfair text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight mb-6">
          Amasoko Hub - Tenders, Jobs & Investment Opportunities in Rwanda
        </h1>
        
        <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto mb-4">
          Discover and apply for the best opportunities in Rwanda. Connect with businesses, government entities, and investors.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-base opacity-90">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
            <span>Verified Opportunities</span>
          </div>
          <div className="flex items-center gap-2 text-base opacity-90">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
            <span>Real-time Updates</span>
          </div>
          <div className="flex items-center gap-2 text-base opacity-90">
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold">✓</span>
            <span>Easy Application Process</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="px-8 py-4 bg-[#E67E22] text-white font-semibold text-lg rounded-lg shadow-sm transition-all duration-300 hover:bg-[#D97311] hover:shadow-md hover:-translate-y-1">
            Get Started
          </Link>
          <a href="#about" className="px-8 py-4 bg-white/15 text-white font-semibold text-lg rounded-lg shadow-sm backdrop-blur-sm border border-white/30 transition-all duration-300 hover:bg-white/25 hover:-translate-y-1">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
