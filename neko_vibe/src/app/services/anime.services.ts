// General anime endpoints
import jikanClient from './client';
import type { Anime, Pagination } from './types';

export const AnimeService = {
  getById: async (id: number): Promise<Anime> => {
    const { data } = await jikanClient.get(`/anime/${id}`);
    return data.data;
  },

  search: async (
    query: string,
    filters: {
      genres?: string;
      type?: string;
      status?: string;
      season?: string;
      year?: string;
      order_by?: string;
      sort?: string;
    },
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Anime[]; pagination: Pagination }> => {
    const { data } = await jikanClient.get('/anime', {
      params: {
        q: query,
        genres: filters.genres,
        type: filters.type,
        status: filters.status,
        season: filters.season,
        year: filters.year,
        order_by: filters.order_by,
        sort: filters.sort,
        page,
        limit
      }
    });
    return data;
  }
};