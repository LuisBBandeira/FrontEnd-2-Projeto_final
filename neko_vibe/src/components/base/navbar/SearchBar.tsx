import React from 'react';

const SearchBar = ({ placeholder = "Search...", className = "" }) => {
    return (
        <div className={`hidden lg:flex w-fit ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                aria-label="Search"
                className="w-full sm:w-64 px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-colors duration-200"
            />
        </div>
    );
};

export default SearchBar