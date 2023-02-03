import Link from 'next/link';
import Image from 'next/image';
import type { Anime } from '../types/jikan';

const AnimeCard = ({ anime }: { anime: Anime }): JSX.Element => {
  return (
    <Link
      className="rounded-xl"
      style={{
        backgroundImage: `url(${anime.images.jpg.large_image_url})`,
      }}
      href={`/anime/${anime.mal_id}`}
      key={anime.mal_id}
    >
      <div className="flex h-64 w-full flex-row space-x-6 rounded-xl bg-black/20 p-6 text-white backdrop-blur-lg backdrop-brightness-50 hover:backdrop-brightness-0">
        <Image
          className="min-h-full rounded"
          priority
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={144}
          height={144}
        />
        <div className="flex h-full flex-col space-y-2">
          <h3 className="text-2xl font-bold line-clamp-2">{anime.title}</h3>
          <div className="space-x-2">
            <span className="text-xs">
              ⭐️ {anime.score ?? '-'} ({anime.scored_by?.toLocaleString() ?? '-'})
            </span>
            <span className="rounded-lg bg-red-800 px-1.5 py-1 text-[0.6rem] font-semibold uppercase">
              {anime.type}
            </span>
          </div>
          <div className="overflow-hidden text-sm line-clamp-5">{anime.synopsis}</div>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
