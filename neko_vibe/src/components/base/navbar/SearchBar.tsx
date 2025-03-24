'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimeService, Anime } from '../../../app/services';

const SearchBar = ({
  placeholder = "Search anime...",
  className = "",
  showIcon = true,
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);

  // Debounce search input
  useEffect(() => {
    const searchAnime = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        const response = await AnimeService.search(query);
        setResults(response.data || []);
      } catch (error) {
        console.error('Error fetching anime search results:', error);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchAnime();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-lg">
      <div className={`flex w-full ${className}`}>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent
                     hover:border-gray-400 transition-all duration-200
                     placeholder-gray-500 text-gray-700
                     dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200
                     dark:placeholder-gray-400 dark:focus:ring-cyan-500"
            {...props}
          />
        </div>
      </div>

      {results.length > 0 && (
        <div className="mt-2 absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl max-h-96 overflow-y-auto">
          {results.map((anime) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="block hover:no-underline focus:outline-none group"
              onClick={() => setResults([])}
            >
              <div className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={anime.images?.jpg?.image_url || '/placeholder-anime.jpg'}
                    alt={anime.title}
                    width={48}
                    height={64}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
                  />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {anime.title}
                  </h3>
                  <div className="mt-1 flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                    {anime.score && (
                      <span className="flex items-center bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded">
                        ⭐ {anime.score}
                      </span>
                    )}
                    <span>{anime.type}</span>
                    {anime.episodes && (
                      <span>{anime.episodes} episodes</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;