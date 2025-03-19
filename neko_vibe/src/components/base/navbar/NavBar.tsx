"use client"
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const NavBar = () => {
    const [isVertical, setIsVertical] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
                setIsVertical(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 p-3 z-50 bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 group"
            >
                <div className="space-y-1.5">
                    <span className="block w-6 h-0.5 bg-white rounded-full transition-transform group-hover:scale-110"></span>
                    <span className="block w-6 h-0.5 bg-white rounded-full transition-transform group-hover:scale-110"></span>
                    <span className="block w-6 h-0.5 bg-white rounded-full transition-transform group-hover:scale-110"></span>
                </div>
            </button>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40" 
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Navigation */}
            <header className={`bg-white shadow-md transition-all duration-300 ease-in-out
                ${isVertical ? 
                    "lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-80" :
                    "lg:relative lg:w-full lg:h-20"
                }
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                fixed lg:relative left-0 top-0 h-screen lg:h-auto w-72 lg:w-auto z-50`}>

                <nav className={`h-full flex flex-col
                    ${isVertical ? 
                        "lg:gap-6 lg:p-6" :
                        "lg:flex-row lg:items-center lg:justify-between lg:px-6"
                    }
                    gap-8 p-6`}
                >
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden absolute top-5 right-5 p-2 text-gray-600 hover:text-gray-800"
                    >
                        ✕
                    </button>
  
                    {/* Home Link */}
                    <div className="flex justify-center lg:justify-start mt-2 lg:mt-0">
                        <a href="#" className="text-purple-700 hover:text-white hover:bg-purple-600 border-2 border-purple-600 px-5 py-2 rounded-md font-medium transition-all duration-200">
                            Home
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className={`flex ${isVertical ? "w-full my-4" : "lg:max-w-2xl lg:mx-4"}`}>
                        <SearchBar className="w-full" />
                    </div>

                    {/* Sign In Button */}
                    <div className="flex justify-center lg:justify-start mb-4 lg:mb-0 lg:order-3">
                        <button className={`text-white bg-cyan-600 hover:bg-cyan-700 w-full px-8 py-2.5 rounded-md transition-colors duration-200
                            ${isVertical ? "lg:w-full" : "lg:w-auto lg:px-6"}`}
                        >
                            Sign in
                        </button>
                    </div>

                    {/* Desktop Toggle Button */}
                    <button
                        onClick={() => setIsVertical(!isVertical)}
                        className={`hidden lg:flex items-center p-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition-all
                            ${isVertical ? 'absolute top-5 right-5' : 'lg:relative lg:order-4'}`}
                    >
                        {isVertical ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-gray-600"
                            >
                                <path d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-gray-600"
                            >
                                <path d="M5 4h2v16H5V4zm6 0h2v16h-2V4zm6 0h2v16h-2V4z" />
                            </svg>
                        )}
                    </button>
                </nav>
            </header>
        </>
    );
};

export default NavBar;