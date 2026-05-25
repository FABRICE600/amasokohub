import React from 'react';

const Trust: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="container max-w-[1400px] mx-auto px-4">
        {/* Trust Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#0A2540] mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of organizations that trust Amasoko Hub for their tender, job, and investment needs.
          </p>
        </div>

        {/* Trust Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {['Government of Rwanda', 'Rwanda Development Board', 'United Nations', 'African Development Bank', 'World Bank', 'MTN Rwanda'].map((org, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 h-32 flex items-center justify-center">
              <div className="text-[#0A2540] font-semibold text-sm text-center">
                {org}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: 'Amasoko Hub has revolutionized how we find and apply for tenders. The platform is user-friendly and the opportunities are verified and relevant.',
              author: 'John Doe',
              position: 'CEO, Construction Co. Ltd'
            },
            {
              quote: 'We\'ve hired several qualified candidates through Amasoko Hub. The job matching system is excellent and saves us time in the recruitment process.',
              author: 'Jane Smith',
              position: 'HR Manager, Tech Solutions Rwanda'
            },
            {
              quote: 'As an investor, I\'ve found great opportunities on Amasoko Hub. The detailed information and verification process gives me confidence in my investments.',
              author: 'David Kigali',
              position: 'Investment Consultant'
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8">
              <div className="text-4xl text-gray-300 mb-4">"</div>
              <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0A2540] to-[#1B4965] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[#0A2540]">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;