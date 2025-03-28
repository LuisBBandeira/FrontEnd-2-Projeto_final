"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SeasonService, type Anime } from '@/app/services';

const RecentlyUpdated = () => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchRecentAnime = async () => {
        try {
          setLoading(true);
          const response = await SeasonService.getCurrentSeason();
          setAnimes(response.data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch recently updated anime');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRecentAnime();
    }, []);
  
    if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
    if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold dark:text-white mb-8">Recently Updated Anime</h2>
        
        {animes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No anime found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {animes.map((anime) => (
              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                    alt={anime.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg dark:text-white line-clamp-2">
                    {anime.title}
                    {anime.title_english && (
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {anime.title_english}
                      </span>
                    )}
                  </h3>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {anime.type}
                    </span>
                    {anime.score && (
                      <span className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm">
                        ⭐ {anime.score.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {anime.status && (
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {anime.status}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
};
  
export default RecentlyUpdated;