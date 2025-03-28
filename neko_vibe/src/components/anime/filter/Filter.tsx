'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { GenreService } from '@/app/services';

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<Array<{ mal_id: number; name: string }>>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initialFilters: Record<string, string> = {};
    const params = ['genres', 'type', 'status', 'order_by'];
    
    params.forEach(param => {
      const value = searchParams.get(param);
      if (value) initialFilters[param] = value;
    });

    setFilters(initialFilters);
    setInitialized(true);
  }, [searchParams]);

  useEffect(() => {
    GenreService.getGenres().then(setGenres).catch(console.error);
  }, []);

  const updateURL = useCallback(() => {
    if (!initialized) return;
    
    const params = new URLSearchParams(searchParams.toString());
    
    // Preserve search query
    const currentQuery = searchParams.get('q');
    if (currentQuery) {
      params.set('q', currentQuery);
    }

    // Update filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/anime?${params.toString()}`);
  }, [filters, router, searchParams, initialized]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleFilter = (name: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (value) {
        newFilters[name] = value;
      } else {
        delete newFilters[name];
      }
      return newFilters;
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Genre</label>
        <select 
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => handleFilter('genres', e.target.value)}
          value={filters.genres || ''}
        >
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre.mal_id} value={genre.mal_id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Type</label>
        <select
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => handleFilter('type', e.target.value)}
          value={filters.type || ''}
        >
          {['', 'tv', 'movie', 'ova'].map(type => (
            <option key={type} value={type}>{type || 'All'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Status</label>
        <select
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => handleFilter('status', e.target.value)}
          value={filters.status || ''}
        >
          {['', 'airing', 'complete', 'upcoming'].map(status => (
            <option key={status} value={status}>{status || 'All'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Sort By</label>
        <select
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200"
          onChange={(e) => handleFilter('order_by', e.target.value)}
          value={filters.order_by || ''}
        >
          {['', 'score', 'title', 'episodes'].map(sort => (
            <option key={sort} value={sort}>{sort || 'Default'}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;