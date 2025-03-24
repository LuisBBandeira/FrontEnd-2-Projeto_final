import { AnimeService, Anime } from "../../services";
import Image from 'next/image';
import Link from 'next/link';

export default async function AnimeDetailPage({params,}: {params: Promise<{ id: string }>;}) {

  // For some reason, the await has no effet but if i don't put it here a error will be thrown!
  const  resolvedParams = await params;
  const id = resolvedParams.id;
  
  let anime: Anime;
  try {
    anime = await AnimeService.getById(Number(id));
  } catch {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-4 mb-4">
                {anime.score && (
                  <div className="badge badge-primary">
                    Score: {anime.score.toFixed(1)}
                  </div>
                )}
                {anime.episodes && (
                  <div className="badge badge-secondary">
                    Episodes: {anime.episodes}
                  </div>
                )}
                {anime.status && (
                  <div className="badge badge-accent">
                    Status: {anime.status}
                  </div>
                )}
              </div>

              {anime.synopsis && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">{anime.synopsis}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold mb-2 text-lg">Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Type</dt>
                    <dd className="font-medium">{anime.type || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Aired</dt>
                    <dd className="font-medium">{anime.aired?.string || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Rating</dt>
                    <dd className="font-medium">{anime.score || 'N/A'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}