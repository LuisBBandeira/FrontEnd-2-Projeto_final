"use client"
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
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
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                fixed lg:relative left-0 top-0 h-screen lg:h-auto w-72 lg:w-full z-50`}>

                <nav className="h-full flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-6 gap-8 p-6">
                    {/* Home Link */}
                    <div className="flex justify-center lg:justify-start mt-2 lg:mt-0">
                        <a href="/ " className="text-purple-700 hover:text-white hover:bg-purple-600 border-2 border-purple-600 px-5 py-2 rounded-md font-medium transition-all duration-200">
                            Home
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="flex lg:max-w-2xl lg:mx-4">
                        <SearchBar className="w-full" />
                    </div>

                    {/* Sign In Button */}
                    <div className="flex justify-center lg:justify-start mb-4 lg:mb-0 lg:order-3">
                        <button className="text-white bg-cyan-600 hover:bg-cyan-700 w-full px-8 py-2.5 rounded-md transition-colors duration-200 lg:w-auto lg:px-6">
                            Sign in
                        </button>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default NavBar;