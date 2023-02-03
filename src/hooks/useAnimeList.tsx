/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWR from 'swr';

import type { JikanResponse, Anime } from '../types/jikan';

const fetcher = async (url: string) => {
  const res = await axios.get<JikanResponse<Anime>>(url);
  return res.data.data;
};

// const getKey: SWRInfiniteKeyLoader<Anime[][]> = (page, previousPageData) => {
//   if (previousPageData && !previousPageData.length) return null; // reached the end
//   return `/api/v4/top/anime?page=${page + 1}`; // SWR key
// };

function useJikan(page: number) {
  const { data, isLoading, error, ...rest } = useSWR<Anime[], AxiosError>(
    `/api/v4/top/anime?page=${page + 1}`,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
    ...rest,
  };
}

export default useJikan;
