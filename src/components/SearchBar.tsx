import type { SetStateAction, Dispatch } from 'react';
import { useRef, useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import cn from '../lib/cn';
import { useAnicoreStore } from '../store/store';
import { Anime } from '../types/jikan';
import type { AnimeType } from '../types/search';
import { animeType } from '../types/search';

type OptionProps<T> = {
  title: string;
  value: T;
  options: T[];
  setFunction: Dispatch<SetStateAction<T>> | ((t: T) => void);
  renderFunction?: (s: T) => string;
};

function Option<T>({ title, options, value, setFunction, renderFunction = (s) => s as string }: OptionProps<T>) {
  const dropRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClicks = (event: MouseEvent) => {
      if (isOpen && dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClicks);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClicks);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className="z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border-x-2 border-gray-200 bg-white py-2.5 px-4 text-center text-sm font-medium"
        type="button"
      >
        {title}: {renderFunction(value)}
      </button>
      <div
        ref={dropRef}
        className={cn(
          isOpen ? 'absolute top-10 flex' : 'hidden',
          'z-10 w-44 divide-y divide-gray-100 rounded-lg shadow-lg'
        )}
      >
        <div className="w-full rounded-lg bg-gray-50 py-2 text-sm text-gray-700">
          {options.map((item, idx) => (
            <button
              type="button"
              key={idx}
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setFunction(item);
                setOpen(false);
              }}
            >
              {renderFunction(item)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

const SearchBar = (): JSX.Element => {
  const setSearchText = useAnicoreStore((state) => state.setSearchText);

  const animeTypeState = useAnicoreStore((state) => state.animeType);
  const setAnimeType = useAnicoreStore((state) => state.setAnimeType);

  const [rawText, setRawText] = useState<string>('');
  const [debouncedText] = useDebounce(rawText, 800);

  useEffect(() => {
    setSearchText(debouncedText);
  }, [debouncedText, setSearchText]);

  return (
    <div className="w-full">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="relative flex flex-row rounded-lg bg-gray-50">
          <Option<AnimeType>
            title="Type"
            value={animeTypeState}
            options={animeType as unknown as AnimeType[]}
            setFunction={setAnimeType}
            renderFunction={(s) => s.toUpperCase()}
          />
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

export default SearchBar;
