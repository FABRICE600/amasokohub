import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[#0A2540] mb-4">
            Discover Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through thousands of verified tenders, jobs, and investment opportunities in Rwanda.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 border-b-2 border-gray-200">
          <button className="px-6 py-3 bg-transparent border-none text-lg font-semibold text-[#E67E22] relative whitespace-nowrap transition-all duration-300 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1.5 after:bg-[#E67E22] after:transform after:scale-x-100 after:transition-all after:duration-300">
            All Opportunities
          </button>
          <button className="px-6 py-3 bg-transparent border-none text-lg font-semibold text-gray-600 relative whitespace-nowrap transition-all duration-300 hover:text-[#0A2540] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1.5 after:bg-[#E67E22] after:transform after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100">
            Tenders
          </button>
          <button className="px-6 py-3 bg-transparent border-none text-lg font-semibold text-gray-600 relative whitespace-nowrap transition-all duration-300 hover:text-[#0A2540] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1.5 after:bg-[#E67E22] after:transform after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100">
            Jobs
          </button>
          <button className="px-6 py-3 bg-transparent border-none text-lg font-semibold text-gray-600 relative whitespace-nowrap transition-all duration-300 hover:text-[#0A2540] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1.5 after:bg-[#E67E22] after:transform after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100">
            Investments
          </button>
          <button className="px-6 py-3 bg-transparent border-none text-lg font-semibold text-gray-600 relative whitespace-nowrap transition-all duration-300 hover:text-[#0A2540] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-1.5 after:bg-[#E67E22] after:transform after:scale-x-0 after:transition-all after:duration-300 hover:after:scale-x-100">
            Grants
          </button>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-[100px]">
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#0A2540] mb-4 uppercase tracking-wider">
                Category
              </h3>
              <div className="space-y-3">
                {['Construction', 'Information Technology', 'Agriculture', 'Healthcare', 'Education'].map((category) => (
                  <div key={category} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#E67E22] rounded focus:ring-[#E67E22]" />
                    <label className="text-sm text-gray-800 cursor-pointer flex-1">{category}</label>
                    <span className="text-xs text-gray-500">24</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#0A2540] mb-4 uppercase tracking-wider">
                Location
              </h3>
              <div className="space-y-3">
                {['Kigali', 'Butare', 'Gisenyi', 'Ruhengeri', 'Byumba'].map((location) => (
                  <div key={location} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#E67E22] rounded focus:ring-[#E67E22]" />
                    <label className="text-sm text-gray-800 cursor-pointer flex-1">{location}</label>
                    <span className="text-xs text-gray-500">18</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-[#0A2540] mb-4 uppercase tracking-wider">
                Budget Range
              </h3>
              <div className="space-y-4">
                <input 
                  type="number" 
                  placeholder="Min (RWF)" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#1B4965]"
                />
                <input 
                  type="number" 
                  placeholder="Max (RWF)" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#1B4965]"
                />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <h3 className="text-sm font-bold text-[#0A2540] mb-4 uppercase tracking-wider">
                Deadline
              </h3>
              <div className="space-y-3">
                {['This Week', 'This Month', 'Next Month', 'Anytime'].map((deadline) => (
                  <div key={deadline} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="deadline" className="w-4 h-4 text-[#E67E22] focus:ring-[#E67E22]" />
                    <label className="text-sm text-gray-800 cursor-pointer">{deadline}</label>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Opportunities Content */}
          <main>
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex justify-between items-center">
              <div className="text-gray-600">
                <span className="font-bold text-[#0A2540]">247</span> results found
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-md text-sm appearance-none bg-white bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22%3E%3Cpath fill=%22%2364748B%22 d=%22M6 9L1 4h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-right-3 bg-center cursor-pointer">
                <option>Sort by: Date (Newest)</option>
                <option>Sort by: Date (Oldest)</option>
                <option>Sort by: Budget (High to Low)</option>
                <option>Sort by: Budget (Low to High)</option>
              </select>
            </div>

            {/* Opportunities Grid */}
            <div className="space-y-6">
              {/* Sample Opportunity Card */}
              <article className="bg-white rounded-xl shadow-md p-7 border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:border-[#E67E22] transition-all duration-300 cursor-pointer">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">New</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full uppercase tracking-wide">Verified</span>
                  </div>
                  <div className="text-sm text-gray-500">Posted 2 days ago</div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-[#0A2540] mb-3 leading-tight">
                  Construction of 50 Low-Cost Housing Units in Kigali
                </h3>

                {/* Institution */}
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-lg">🏢</div>
                  <span>Rwanda Housing Authority</span>
                </div>

                {/* Card Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-lg mb-6">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Budget</div>
                    <div className="text-lg font-bold text-[#E67E22]">RWF 500M</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</div>
                    <div className="font-semibold">Construction</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</div>
                    <div className="font-semibold">Kigali</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deadline</div>
                    <div className="font-semibold text-red-600">15 Days Left</div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-[#0A2540] hover:text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center gap-2">
                      ⭐ Save
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-[#0A2540] hover:text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center gap-2">
                      📤 Share
                    </button>
                  </div>
                  <button className="px-5 py-2 bg-[#E67E22] text-white text-sm font-semibold rounded-md hover:bg-[#D97311] hover:translate-x-1 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </article>

              {/* Repeat for more cards */}
              <article className="bg-white rounded-xl shadow-md p-7 border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:border-[#E67E22] transition-all duration-300 cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full uppercase tracking-wide">Closing Soon</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full uppercase tracking-wide">Verified</span>
                  </div>
                  <div className="text-sm text-gray-500">Posted 5 days ago</div>
                </div>
                <h3 className="text-xl font-bold text-[#0A2540] mb-3 leading-tight">
                  IT Infrastructure Upgrade for Government Ministries
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
                  <div className="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center text-lg">🏢</div>
                  <span>Ministry of ICT</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50 rounded-lg mb-6">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Budget</div>
                    <div className="text-lg font-bold text-[#E67E22]">RWF 300M</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Category</div>
                    <div className="font-semibold">IT Services</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Location</div>
                    <div className="font-semibold">Kigali</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Deadline</div>
                    <div className="font-semibold text-red-600">3 Days Left</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-gray-100 hover:bg-[#0A2540] hover:text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center gap-2">
                      ⭐ Save
                    </button>
                    <button className="px-4 py-2 bg-gray-100 hover:bg-[#0A2540] hover:text-white text-sm font-medium rounded-md transition-colors duration-300 flex items-center gap-2">
                      📤 Share
                    </button>
                  </div>
                  <button className="px-5 py-2 bg-[#E67E22] text-white text-sm font-semibold rounded-md hover:bg-[#D97311] hover:translate-x-1 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </article>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;