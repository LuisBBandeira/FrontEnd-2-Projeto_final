// Shared TypeScript interfaces
export interface Anime {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp?: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
    title_english?: string;
    episodes?: number;
    status: string;
    score?: number;
    synopsis?: string;
}
  
export interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
}