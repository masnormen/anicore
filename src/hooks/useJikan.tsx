/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosError } from 'axios';
import useSWRInfinite, { type SWRInfiniteKeyLoader } from 'swr/infinite';
import type { JikanResponse, Anime } from '../types/jikan';

const fetcher = async (url: string) => {
  const res = await axios.get<JikanResponse<Anime>>(url);
  return res.data.data;
};

const getKey: SWRInfiniteKeyLoader<Anime[][]> = (page, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/v4/top/anime?page=${page + 1}`; // SWR key
};

function useJikan() {
  const { data, isLoading, error, size, ...rest } = useSWRInfinite<Anime[], AxiosError>(getKey, fetcher, {
    initialSize: 1,
    revalidateFirstPage: false,
  });

  // Indicates that an additional page is being fetched
  const isLoadingMore = isLoading || (size > 0 && data != null && data?.length < size);

  return {
    data,
    isLoading,
    isLoadingMore,
    error,
    size,
    ...rest,
  };
}

export default useJikan;
