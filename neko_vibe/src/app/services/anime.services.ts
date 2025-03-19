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
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Anime[]; pagination: Pagination }> => {
    const { data } = await jikanClient.get('/anime', {
      params: { q: query, page, limit }
    });
    return data;
  }
};