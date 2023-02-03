import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';

import useAnimeList from '../hooks/useAnimeList';

import AnimeCard from './AnimeCard';
import Spinner from './Spinner';

type AnimeListProps = {
  page: number;
  isHidden?: boolean;
  setHasNextPage?: Dispatch<SetStateAction<boolean>>;
};

const AnimeList = ({ page, isHidden = false, setHasNextPage }: AnimeListProps): JSX.Element | null => {
  const { data, isLoading, hasNextPage } = useAnimeList(page);

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

  return (
    <>
      {data?.map((item, idx) => (
        <AnimeCard key={idx} anime={item} />
      ))}
    </>
  );
};

export default AnimeList;
