"use client";

import { type Anime } from '../../../app/services';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

export default function TopAnimeCarousel({ items }: { items: Anime[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Memoize cloned items to prevent unnecessary re-renders
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

    // Faster timeout matching CSS transition duration
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, clonedItems.length]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const middleSection = items.length;
      const endSection = items.length * 2;

      if (currentIndex >= endSection) {
        container.scrollLeft = container.scrollWidth / 3;
        setCurrentIndex(middleSection);
      } else if (currentIndex < 0) {
        container.scrollLeft = container.scrollWidth / 3 * 2;
        setCurrentIndex(middleSection - 1);
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
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth overflow-visible hide-scrollbar"
        aria-label="Top Anime Carousel"
      >
        {clonedItems.map((anime, index) => {
          const originalIndex = index % items.length;
          return (
            <div
              key={`${anime.mal_id}-${index}`}
              className="w-[200px] mt-[20px] flex-shrink-0 snap-center transition-all duration-300"
              aria-label={`Slide ${originalIndex + 1} of ${items.length}`}
              style={{
                transform: `scale(${currentIndex % items.length === originalIndex ? 1.1 : 0.9})`,
                opacity: currentIndex % items.length === originalIndex ? 1 : 0.7,
                zIndex: currentIndex % items.length === originalIndex ? 10 : 1,
              }}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform mx-2">
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 200px"
                  priority={index < items.length}
                />
              </div>
              <h3 className="mt-4 mb-4 text-sm font-semibold text-black text-center line-clamp-2 px-2">
                {anime.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
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

      {/* Pagination Dots */}
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