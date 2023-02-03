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

type AnimeListProps = {
  page: number;
  isHidden?: boolean;
};

const AnimePage = ({ page, isHidden = false }: AnimeListProps): JSX.Element | null => {
  const { data } = useJikan(page);

  if (isHidden) {
    return null;
  }

  return (
    <>
      {data?.map((item) => (
        <Link
          className="flex max-w-xs rounded-xl"
          style={{
            backgroundImage: `url(${item.images.jpg.large_image_url})`,
          }}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          key={item.mal_id}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-black/40 p-4 text-white backdrop-brightness-75">
            <h3 className="text-center text-2xl font-bold">{item.title}</h3>
            <div className="text-lg line-clamp-3">{item.synopsis}</div>
          </div>
        </Link>
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
  const { data } = useSearch(query, page, animeType);

  if (isHidden) {
    return null;
  }

  return (
    <>
      {data?.map((item) => (
        <Link
          className="flex max-w-xs rounded-xl"
          style={{
            backgroundImage: `url(${item.images.jpg.large_image_url})`,
          }}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          key={item.mal_id}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-black/40 p-4 text-white backdrop-brightness-75">
            <h3 className="text-center text-2xl font-bold">{item.title}</h3>
            <div className="text-lg line-clamp-3">{item.synopsis}</div>
          </div>
        </Link>
      ))}
    </>
  );
};

type SearchBarProps = {
  rawText: string;
  text: string;
  setRawText: Dispatch<SetStateAction<string>>;
  setSearchAnimeType: Dispatch<SetStateAction<AnimeType>>;
};
const SearchBar = ({ rawText, text, setRawText, setSearchAnimeType }: SearchBarProps): JSX.Element => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

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
                  onClick={() => setSearchAnimeType(item)}
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

  const [rawText, setRawText] = useState<string>('');
  const [text] = useDebounce(rawText, 800);

  const [searchAnimeType, setSearchAnimeType] = useState<AnimeType>('tv');

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 bg-fixed">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">Anicore</h1>
          <SearchBar {...{ rawText, text, setRawText, setSearchAnimeType }} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-8">
            {text.length > 0 ? (
              <>
                <SearchPage query={text} page={page} animeType={searchAnimeType} />
                {/* Preloading */}
                <SearchPage query={text} page={page + 1} animeType={searchAnimeType} isHidden />
              </>
            ) : (
              <>
                <AnimePage page={page} />
                {/* Preloading */}
                <AnimePage page={page + 1} isHidden />
              </>
            )}

            {/* Load more button */}
            <button
              type="button"
              className="flex max-w-full flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              <h3 className="text-2xl font-bold">Prev</h3>
            </button>

            {/* Load more button */}
            <button
              type="button"
              className="flex max-w-full flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => setPage(page + 1)}
            >
              <h3 className="text-2xl font-bold">Next (now: {page})</h3>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
