/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { Anime } from '../types/jikan';

const fetcher = async (url: string) => {
  const res = await axios.get<{ data: Anime }>(url);
  return res.data.data;
};

function useAnimeDetail(id: string) {
  const { data, isLoading, error, ...rest } = useSWR<Anime, AxiosError>(`/api/v4/anime/${id}`, fetcher);

  return {
    data,
    isLoading,
    error,
    ...rest,
  };
}

export default useAnimeDetail;
