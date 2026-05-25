import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-[clamp(2rem,4vw,3rem)] font-playfair font-extrabold text-[#E67E22] mb-2">500+</div>
            <div className="text-gray-600 font-medium">Active Tenders</div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-[clamp(2rem,4vw,3rem)] font-playfair font-extrabold text-[#E67E22] mb-2">250+</div>
            <div className="text-gray-600 font-medium">Job Opportunities</div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-[clamp(2rem,4vw,3rem)] font-playfair font-extrabold text-[#E67E22] mb-2">150+</div>
            <div className="text-gray-600 font-medium">Investment Projects</div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="text-[clamp(2rem,4vw,3rem)] font-playfair font-extrabold text-[#E67E22] mb-2">5,000+</div>
            <div className="text-gray-600 font-medium">Registered Users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;