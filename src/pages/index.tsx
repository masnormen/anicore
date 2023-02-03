/* eslint-disable @typescript-eslint/no-misused-promises */

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import useJikan from '../hooks/useAnimeList';
import cn from '../lib/cn';
import { useDebounce } from 'use-debounce';
import type { AnimeType } from '../hooks/useSearch';
import useSearch, { animeType } from '../hooks/useSearch';
import Image from 'next/image';
import AnimeCard from '../components/AnimeCard';
import { useAnicoreStore } from '../store/store';

type AnimeListProps = {
  page: number;
  isHidden?: boolean;
};

const AnimePage = ({ page, isHidden = false }: AnimeListProps): JSX.Element | null => {
  const { data, isLoading } = useJikan(page);

  if (isHidden) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 w-full flex-row space-x-6 rounded-xl bg-black/40 p-6 text-white">
        <div className="flex h-full flex-col space-y-2">
          <h3 className="text-2xl font-bold line-clamp-2">Loading...</h3>
        </div>
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

type SearchPageProps = {
  query: string;
  page: number;
  animeType: AnimeType;
  isHidden?: boolean;
};

const SearchPage = ({ query, page, animeType, isHidden }: SearchPageProps): JSX.Element | null => {
  const { data, isLoading } = useSearch(query, page, animeType);

  if (isHidden) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 w-full flex-row space-x-6 rounded-xl bg-black/40 p-6 text-white">
        <div className="flex h-full flex-col space-y-2">
          <h3 className="text-2xl font-bold line-clamp-2">Loading...</h3>
        </div>
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

// type SearchBarProps = {
//   setSearchAnimeType: Dispatch<SetStateAction<AnimeType>>;
// };

const SearchBar = (): JSX.Element => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const setSearchText = useAnicoreStore((state) => state.setSearchText);
  const setAnimeType = useAnicoreStore((state) => state.setAnimeType);

  const [rawText, setRawText] = useState<string>('');
  const [debouncedText] = useDebounce(rawText, 800);

  useEffect(() => {
    setSearchText(debouncedText);
  }, [debouncedText, setSearchText]);

  useEffect(() => {
    const handleOutsideClicks = (event: MouseEvent) => {
      if (isOpen && dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleOutsideClicks);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, [isOpen]);

  return (
    <div className="w-full">
      <form>
        <div className="relative flex flex-row rounded-lg bg-gray-50">
          <button
            onClick={() => setOpen(!isOpen)}
            className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border-x-2 border-gray-200 bg-white py-2.5 px-4 text-center text-sm font-medium"
            type="button"
          >
            Type
          </button>
          <div
            ref={dropRef}
            className={cn(
              isOpen ? 'absolute top-10 flex' : 'hidden',
              'z-10 w-44 divide-y divide-gray-100 rounded-lg shadow-lg'
            )}
          >
            <div className="w-full rounded-lg bg-gray-50 py-2 text-sm text-gray-700">
              {animeType.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => setAnimeType(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-200 border-l-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-0"
              placeholder="Search anime title"
              required
              onChange={(e) => setRawText(e.target.value)}
              value={rawText}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(0);

  const searchText = useAnicoreStore((state) => state.searchText);
  const animeType = useAnicoreStore((state) => state.animeType);

  useEffect(() => {
    setPage(0);
  }, [searchText]);

  return (
    <>
      <Head>
        <title>Anicore</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-conic-t flex min-h-screen flex-col items-center justify-center from-orange-900 via-amber-100 to-orange-900 bg-fixed">
        <div className="container flex flex-col items-center justify-center space-y-16 px-8 py-32 sm:py-48 sm:px-12">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="bg-conic-tl from-stone-600 via-zinc-900 to-purple-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
              Anicore
            </h1>
            <h2 className="text-lg tracking-tight text-gray-800 sm:text-[1.5rem]">The Anime Directory</h2>
          </div>

          <SearchBar />

          <h2 className="text-lg font-bold tracking-tight text-gray-800 sm:text-[1.5rem]">
            {searchText.length > 0 ? `Showing results for "${searchText}"` : 'Top Anime'}
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            {searchText.length > 0 ? (
              <>
                <SearchPage query={searchText} page={page} animeType={animeType} />
                {/* Preloading */}
                <SearchPage query={searchText} page={page + 1} animeType={animeType} isHidden />
              </>
            ) : (
              <>
                <AnimePage page={page} />
                {/* Preloading */}
                <AnimePage page={page + 1} isHidden />
              </>
            )}

            <button
              type="button"
              className="flex max-w-full flex-col gap-4 rounded-xl bg-black/40 p-4 text-white hover:bg-black/60"
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              <h3 className="text-2xl font-bold">Prev</h3>
            </button>
            <button
              type="button"
              className="flex max-w-full flex-col gap-4 rounded-xl bg-black/40 p-4 text-white hover:bg-black/60"
              onClick={() => setPage(page + 1)}
            >
              <h3 className="text-2xl font-bold">Next</h3>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
