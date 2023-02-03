import { create } from 'zustand';
import type { AnimeType } from '../hooks/useSearch';

interface AnicoreState {
  searchText: string;
  animeType: AnimeType;
  setSearchText: (query: string) => void;
  setAnimeType: (type: AnimeType) => void;
}

export const useAnicoreStore = create<AnicoreState>((set) => ({
  searchText: '',
  animeType: 'tv',
  setSearchText: (query: string) => set(() => ({ searchText: query })),
  setAnimeType: (type: AnimeType) => set(() => ({ animeType: type })),
}));
