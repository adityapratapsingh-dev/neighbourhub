'use client';

import React, { useState, useEffect } from 'react';

// --- Types for Backend Readiness ---
interface Provider {
  id: string;
  name: string;
  category: string;
  rate: number;
  rating: number;
  reviews: number;
  description: string;
  distance?: number;
}

interface Job {
  id: string;
  title: string;
  category: string;
  budget: number;
  description: string;
}

// --- Icons (Inline SVG Line-Art, Uniform Stroke, Coral #FF5722) ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FF5722" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const CleaningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 9-9" />
    <path d="M12.2 6.2 11 5l2.6-2.6a2 2 0 1 1 3 3l-2.6 2.6-1.2-1.2Z" />
    <path d="m14 15 1.8-1.8" />
    <path d="m18 11 1.8-1.8" />
    <path d="m22 7-1.8 1.8" />
    <path d="m7 22-1.8-1.8" />
    <path d="m11 18-1.8 1.8" />
    <path d="m15 14-1.8 1.8" />
  </svg>
);

const PlumbingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ElectricalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TutoringIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// --- Constants ---
const MOCK_CATEGORIES = [
  { id: 'cleaning', name: 'Cleaning', icon: CleaningIcon },
  { id: 'plumbing', name: 'Plumbing', icon: PlumbingIcon },
  { id: 'electrical', name: 'Electrical', icon: ElectricalIcon },
  { id: 'tutoring', name: 'Tutoring', icon: TutoringIcon },
];

export default function NeighbourHub() {
  const [currentView, setCurrentView] = useState<'home' | 'search'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- Backend-Ready State Management ---
  const [providers, setProviders] = useState<Provider[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]); // Prepared for job requests
  const [isLoading, setIsLoading] = useState(true);

  // Scroll listener for Navbar drop-shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Data fetching placeholder logic
  useEffect(() => {
    /* 
      TODO: Implement real Backend Integration (e.g., Firebase / Supabase)
      
      const fetchMarketplaceData = async () => {
        setIsLoading(true);
        try {
          // 1. Fetch Providers
          // const { data: providersData } = await supabase.from('providers').select('*');
          // setProviders(providersData || []);
          
          // 2. Fetch Jobs
          // const { data: jobsData } = await supabase.from('jobs').select('*');
          // setJobs(jobsData || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMarketplaceData();
    */

    // Simulating empty response for empty states demonstration
    const timer = setTimeout(() => {
      setProviders([]);
      setJobs([]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery(categoryName);
    setActiveCategoryFilter(categoryName);
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const filteredProviders = providers.filter(provider => {
    if (activeCategoryFilter && provider.category !== activeCategoryFilter) return false;
    if (searchQuery && !provider.name.toLowerCase().includes(searchQuery.toLowerCase()) && !provider.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      {/* Global Navigation Bar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-200 ${isScrolled ? 'shadow-sm border-b-transparent' : 'border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div 
              className="text-2xl font-bold tracking-tight text-[#FF5722] cursor-pointer"
              onClick={() => {
                setCurrentView('home');
                setSearchQuery('');
                setActiveCategoryFilter(null);
                window.scrollTo(0, 0);
              }}
            >
              NeighbourHub
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex gap-6">
              <button 
                onClick={() => { setCurrentView('search'); window.scrollTo(0, 0); }}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Browse Services
              </button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Become a Pro
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Sign In
            </button>
            <button className="bg-[#FF5722] px-6 py-2.5 text-white text-sm font-semibold rounded-lg hover:bg-[#E64A19] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-white">
        {currentView === 'home' ? (
          /* --- Landing Page (Home) --- */
          <div className="w-full">
            {/* Hero Section */}
            <header className="bg-gray-50 py-20 border-b border-gray-100">
              <div className="max-w-4xl mx-auto text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
                  Find trusted local professionals instantly.
                </h1>
                
                <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto flex flex-col md:flex-row gap-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-[#FF5722] focus-within:border-transparent">
                  <div className="flex-1 flex items-center px-4 gap-3 md:border-r border-gray-100 py-2 md:py-0">
                    <SearchIcon />
                    <input 
                      type="text" 
                      placeholder="What service do you need?" 
                      className="w-full outline-none text-base text-gray-700 bg-transparent placeholder-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-[#FF5722] px-8 py-3 text-white text-sm font-semibold rounded-lg hover:bg-[#E64A19] transition-all duration-200 w-full md:w-auto mt-2 md:mt-0"
                  >
                    Search
                  </button>
                </form>
              </div>
            </header>

            {/* Category Section */}
            <section className="max-w-5xl mx-auto py-20 px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Popular Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {MOCK_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-lg hover:border-[#FF5722] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <div className="mb-4 text-gray-400 group-hover:text-[#FF5722] transition-colors duration-200">
                        <Icon />
                      </div>
                      <span className="font-semibold text-gray-900">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          /* --- Standard Consumer View (Search Results) --- */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
            {/* Left Column: Sidebar & Filters */}
            <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategoryFilter(null);}}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${!activeCategoryFilter ? 'bg-orange-50 text-[#FF5722]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>All Services</span>
                  </button>
                  {MOCK_CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCategoryFilter === cat.name ? 'bg-orange-50 text-[#FF5722]' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Filters</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                      <div className="absolute left-1/4 right-1/4 h-full bg-[#FF5722]"></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs font-medium text-gray-500">
                      <span>$10</span>
                      <span>$150+</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Min Rating</label>
                    <div className="flex gap-1">
                      <div className="h-1 flex-1 rounded-sm bg-[#FF5722]"></div>
                      <div className="h-1 flex-1 rounded-sm bg-[#FF5722]"></div>
                      <div className="h-1 flex-1 rounded-sm bg-[#FF5722]"></div>
                      <div className="h-1 flex-1 rounded-sm bg-[#FF5722]"></div>
                      <div className="h-1 flex-1 rounded-sm bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column: Provider List */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {searchQuery ? `Results for "${searchQuery}"` : 'Top Professionals near you'}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Sort by:</span>
                  <select className="bg-transparent font-semibold text-gray-900 outline-none cursor-pointer">
                    <option>Popularity</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20 text-gray-400">
                    Loading professionals...
                  </div>
                ) : filteredProviders.length > 0 ? (
                  filteredProviders.map((provider) => (
                    <div key={provider.id} className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#FF5722] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 flex-shrink-0 flex items-center justify-center text-gray-400">
                          <UserIcon />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{provider.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">{provider.category} Professional</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <StarIcon />
                              <span className="text-sm font-bold text-gray-900">{provider.rating.toFixed(1)}</span>
                              <span className="text-sm text-gray-400">({provider.reviews} reviews)</span>
                            </div>
                            <div className="h-4 w-[1px] bg-gray-200"></div>
                            <span className="text-sm font-medium text-gray-600">Available Today</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                        <div className="text-2xl font-bold text-gray-900 mb-3">${provider.rate}<span className="text-sm font-normal text-gray-500">/hr</span></div>
                        <button className="w-full sm:w-auto bg-[#FF5722] px-8 py-2.5 text-white text-sm font-bold rounded-lg hover:bg-[#E64A19] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  /* --- Polished Empty State --- */
                  <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white border border-gray-200 rounded-lg">
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[#FF5722]">
                      <SearchIcon />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">No professionals available</h3>
                    <p className="text-base text-gray-500 mb-8 max-w-md leading-relaxed">
                      There are no professionals available in this category yet. Be the first to join and start offering your services to the neighborhood!
                    </p>
                    <button className="bg-[#FF5722] px-8 py-3 text-white text-sm font-bold rounded-lg hover:bg-[#E64A19] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                      Become a Pro
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="w-full bg-white border-t border-gray-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NeighbourHub. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
