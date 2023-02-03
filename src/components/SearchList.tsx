import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

import useSearch from '../hooks/useSearch';
import type { AnimeType } from '../types/search';

import AnimeCard from './AnimeCard';
import Spinner from './Spinner';

type SearchListProps = {
  query: string;
  page: number;
  animeType: AnimeType;
  isHidden?: boolean;
  setHasNextPage?: Dispatch<SetStateAction<boolean>>;
};

const SearchList = ({ query, page, animeType, isHidden, setHasNextPage }: SearchListProps): JSX.Element | null => {
  const { data, isLoading, hasNextPage } = useSearch(query, page, animeType);

  useEffect(() => {
    if (setHasNextPage) setHasNextPage(hasNextPage);
  }, [hasNextPage, setHasNextPage]);

  if (isHidden) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 w-64 max-w-full flex-col items-center justify-center rounded-xl bg-black/60 p-4 text-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && data && data.length === 0) {
    return (
      <div className="flex h-64 w-64 max-w-full flex-col items-center justify-center rounded-xl bg-black/60 p-4 text-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50">
        No anime found!
      </div>
    );
  }

  return (
    <>
      {data?.map((item, idx) => (
        <AnimeCard key={idx} anime={item} />
      ))}
    </>
  );
};

export default SearchList;
