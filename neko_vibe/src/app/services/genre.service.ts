import jikanClient from './client';

export const GenreService = {
  getGenres: async () => {
    const { data } = await jikanClient.get('/genres/anime');
    return data.data;
  }
};