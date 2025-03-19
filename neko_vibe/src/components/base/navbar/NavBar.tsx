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
                className="lg:hidden fixed top-5 right-5 p-3 z-50 bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-200 group"
            >
                {/* Hamburger Icon */}
                <div className="space-y-1">
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
                    "lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-64" : 
                    "lg:relative lg:w-full lg:h-20"
                }
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                fixed lg:relative left-0 top-0 h-screen lg:h-auto w-64 lg:w-auto z-50`}>

                <nav className={`h-full flex flex-col
                    ${isVertical ? 
                        "lg:gap-8 lg:p-6" : 
                        "lg:flex-row lg:items-center lg:justify-between lg:px-8"
                    }
                    gap-6 p-4`}
                >
                    {/* Desktop Toggle Button */}
                    <button
                        onClick={() => setIsVertical(!isVertical)}
                        className="hidden lg:flex absolute top-4 right-4 p-3 rounded-lg bg-white shadow-md hover:bg-gray-200 transition-all"
                    >
                        {isVertical ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-600"
                            >
                                <path d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z" />
                            </svg> // Horizontal (Top Navbar)
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-gray-600"
                            >
                                <path d="M5 4h2v16H5V4zm6 0h2v16h-2V4zm6 0h2v16h-2V4z" />
                            </svg> // Vertical (Side Navbar)
                        )}
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
                    >
                        ✕
                    </button>
  
                    {/* Home Link */}
                    <div className="flex justify-center lg:justify-start">
                        <a href="#" className="text-purple-700 hover:text-white hover:bg-purple-600 border-2 border-purple-600 px-4 py-1.5 rounded-md font-medium transition-all duration-200">
                            Home
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className={`flex-1 ${isVertical ? "w-full" : "lg:max-w-2xl"}`}>
                        <SearchBar className="w-full" />
                    </div>

                    {/* Sign In Button */}
                    <div className="flex justify-center lg:justify-start">
                        <button className={`text-white bg-cyan-600 hover:bg-cyan-700 w-full px-6 py-2 rounded-md transition-colors duration-200
                            ${isVertical ? "lg:w-full" : "lg:w-auto"}`}
                        >
                            Sign in
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavBar;