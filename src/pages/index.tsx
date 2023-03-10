/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useAnicoreStore } from '../store/store';
import AnimeList from '../components/AnimeList';
import SearchList from '../components/SearchList';
import SearchBar from '../components/SearchBar';

const Home: NextPage = () => {
  const [page, setPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

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
        <div className="container flex flex-col items-center justify-center space-y-16 px-8 py-32 lg:py-48 lg:px-12">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/">
              <h1 className="bg-conic-tl from-stone-600 via-zinc-900 to-purple-300 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent lg:text-[5rem]">
                Anicore
              </h1>
            </Link>
            <h2 className="text-lg tracking-tight text-gray-800 lg:text-[1.5rem]">The Anime Directory</h2>
          </div>

          <SearchBar />

          <h2 className="text-lg font-bold tracking-tight text-gray-800 lg:text-[1.5rem]">
            {searchText.length > 0 ? `Showing results for "${searchText}"` : 'Top Anime'}
          </h2>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {searchText.length > 0 ? (
              <>
                <SearchList query={searchText} setHasNextPage={setHasNextPage} page={page} animeType={animeType} />
                {/* Preloading */}
                <SearchList query={searchText} animeType={animeType} page={page + 1} isHidden />
              </>
            ) : (
              <>
                <AnimeList setHasNextPage={setHasNextPage} page={page} />
                {/* Preloading */}
                <AnimeList page={page + 1} isHidden />
              </>
            )}

            <button
              disabled={page === 0}
              type="button"
              className="flex h-64 max-w-full flex-col items-center justify-center  rounded-xl bg-black/60 p-4 text-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setPage(Math.max(0, page - 1))}
            >
              <h3 className="text-2xl font-bold">??? Prev</h3>
            </button>
            <button
              disabled={!hasNextPage}
              type="button"
              className="flex h-64 max-w-full flex-col items-center justify-center rounded-xl bg-black/60 p-4 text-white hover:bg-black/80 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setPage(page + 1)}
            >
              <h3 className="text-2xl font-bold">Next ???</h3>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
