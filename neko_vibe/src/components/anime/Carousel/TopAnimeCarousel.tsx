"use client";

import { type Anime } from '../../../app/services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function TopAnimeCarousel({ items }: { items: Anime[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const clonedItems = useMemo(() => [...items, ...items, ...items], [items]);

  const centerSelectedItem = useCallback((index: number) => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const item = container.children[index] as HTMLElement;
    const containerWidth = container.clientWidth;
    const itemWidth = item.offsetWidth;
    const scrollPosition = item.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, []);

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = direction === 'prev' 
      ? currentIndex - 1 
      : currentIndex + 1;

    setCurrentIndex((newIndex + clonedItems.length) % clonedItems.length);

    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, clonedItems.length]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const middleSectionStart = items.length;
    setCurrentIndex(middleSectionStart);

    const container = carouselRef.current;
    const item = container.children[middleSectionStart] as HTMLElement;
    const containerWidth = container.clientWidth;
    const itemWidth = item.offsetWidth;
    const initialScroll = item.offsetLeft - (containerWidth / 2) + (itemWidth / 2);
    
    container.scrollTo({
      left: initialScroll,
      behavior: 'auto'
    });
  }, [items.length]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const middleSection = items.length;
      const endSection = items.length * 2;

      if (currentIndex >= endSection) {
        container.scrollLeft = container.scrollWidth / 3;
        setCurrentIndex(middleSection);
      } else if (currentIndex < middleSection) {
        container.scrollLeft = container.scrollWidth / 3;
        setCurrentIndex(middleSection + (currentIndex % items.length));
      }
    };

    container.addEventListener('scrollend', handleScroll);
    return () => container.removeEventListener('scrollend', handleScroll);
  }, [currentIndex, items.length]);

  useEffect(() => {
    const handleResize = () => centerSelectedItem(currentIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, centerSelectedItem]);

  useEffect(() => {
    centerSelectedItem(currentIndex);
  }, [currentIndex, centerSelectedItem]);

  return (
    <div className="relative group h-[400px]">
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth overflow-hidden hide-scrollbar"
        aria-label="Top Anime Carousel"
      >
        {clonedItems.map((anime, index) => {
          const originalIndex = index % items.length;
          return (
            <div
              key={`${anime.mal_id}-${index}`}
              className="w-[200px] mt-[20px] flex-shrink-0 snap-center transition-all duration-300 group"
              aria-label={`Slide ${originalIndex + 1} of ${items.length}`}
              style={{
                transform: `scale(${currentIndex % items.length === originalIndex ? 1.0 : 0.8})`,
                opacity: currentIndex % items.length === originalIndex ? 1 : 0.3,
                zIndex: currentIndex % items.length === originalIndex ? 10 : 1,
              }}
            >
              <Link 
                href={`/anime/${anime.mal_id}`}
                className="block hover:no-underline focus:outline-none"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform mx-2 cursor-pointer">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                    priority={index < items.length}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <h3 className="mt-4 mb-4 text-sm font-semibold text-black text-center line-clamp-2 px-2 hover:text-purple-700 transition-colors">
                  {anime.title}
                </h3>
              </Link>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => handleNavigation('prev')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleNavigation('next')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index + items.length)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex % items.length === index 
                ? 'bg-purple-700 scale-125' 
                : 'bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}