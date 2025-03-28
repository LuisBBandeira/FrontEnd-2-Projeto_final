// season.service.ts
import jikanClient from './client';
import type { Anime, Pagination } from './types';

export const SeasonService = {
  getCurrentSeason: async (
    page: number = 1,
    limit: number = 8
  ): Promise<{ data: Anime[]; pagination: Pagination }> => {
    const { data } = await jikanClient.get('/seasons/now', {
      params: { page, limit }
    });
    return data;
  },
};