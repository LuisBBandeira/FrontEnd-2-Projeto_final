import React from 'react';

const SearchBar = ({ 
    placeholder = "Search...", 
    className = "",
    showIcon = true,
    ...props 
}) => {
    return (
        <form 
            role="search"
            className={`flex w-full max-w-2xl ${className}`}
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="relative w-full">
                {showIcon && (
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                )}
                <input
                    type="search"
                    placeholder={placeholder}
                    aria-label="Search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent
                             hover:border-gray-400 transition-all duration-200
                             placeholder-gray-500 text-gray-700
                             dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                             dark:placeholder-gray-400 dark:focus:ring-cyan-500"
                    {...props}
                />
            </div>
        </form>
    );
};

export default SearchBar;