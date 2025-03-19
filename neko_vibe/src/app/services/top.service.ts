// Top anime endpoints
import jikanClient from './client';
import type { Anime, Pagination } from './types';

export const TopService = {
  getTopAnime: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Anime[]; pagination: Pagination }> => {
    const { data } = await jikanClient.get('/top/anime', {
      params: { page, limit }
    });
    return data;
  },

  getTopAiring: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: Anime[]; pagination: Pagination }> => {
    const { data } = await jikanClient.get('/top/anime', {
      params: { filter: 'airing', page, limit }
    });
    return data;
  }
};