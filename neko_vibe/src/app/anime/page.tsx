'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimeService, type Anime, type Pagination } from '@/app/services';

import Filter from '@/components/anime/filter/Filter';
import Image from 'next/image';

export default function AnimePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<Anime[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getParams = useCallback(() => ({
    q: searchParams.get('q') || '',
    genres: searchParams.get('genres') || undefined,
    type: searchParams.get('type') || undefined,
    status: searchParams.get('status') || undefined,
    season: searchParams.get('season') || undefined,
    year: searchParams.get('year') || undefined,
    order_by: searchParams.get('order_by') || undefined,
    sort: searchParams.get('sort') || 'desc',
    page: Number(searchParams.get('page')) || 1
  }), [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = getParams();
        const response = await AnimeService.search(params.q, params, params.page);
        setData(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error('Error fetching anime:', error);
        setData([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [getParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/anime?${params.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Filter />
      
      {/* Results */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No anime found matching your criteria
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {data.map((anime) => (
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

          {/* Pagination Controls */}
          {pagination && pagination.last_visible_page > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing page {Number(searchParams.get('page') || 1)} of {pagination.last_visible_page}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, (Number(searchParams.get('page')) || 1) - 1))}
                  disabled={(Number(searchParams.get('page')) || 1) <= 1}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.last_visible_page) }, (_, i) => {
                    const page = i + 1;
                    const currentPage = Number(searchParams.get('page')) || 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${currentPage === page 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700'}`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {pagination.last_visible_page > 5 && (
                    <span className="px-2">...</span>
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(pagination.last_visible_page, (Number(searchParams.get('page')) || 1) + 1))}
                  disabled={(Number(searchParams.get('page')) || 1) >= pagination.last_visible_page}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}