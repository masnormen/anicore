/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { JikanResponse, Anime } from '../types/jikan';

const fetcher = async (url: string) => {
  const res = await axios.get<JikanResponse<Anime>>(url);
  return res.data;
};

export const animeType = ['tv', 'movie', 'ova', 'special', 'ona', 'music'] as const;
export type AnimeType = (typeof animeType)[number];

function useSearch(query: string, page: number, type: AnimeType) {
  const { data, isLoading, error, ...rest } = useSWR<JikanResponse<Anime>, AxiosError>(
    `/api/v4/anime?q=${query}&type=${type}&page=${page + 1}`,
    fetcher
  );

  return {
    data: data?.data,
    hasNextPage: data?.pagination.has_next_page ?? false,
    isLoading,
    error,
    ...rest,
  };
}

export default useSearch;
