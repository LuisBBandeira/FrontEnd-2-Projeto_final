import Layout from "../components/base/layout/Layout";
import { TopService } from "./services"
import TopAnimeCarousel from "../components/anime/Carousel/TopAnimeCarousel"

export default async function Home() {
  
  const { data: topAnime } = await TopService.getTopAnime();
  return (
        <Layout>
            <div className="bg-white h-full">
              <h2 className=" flex justify-center text-black text-2xl font-bold mb-6">Top 10 Anime</h2>
              <TopAnimeCarousel items={topAnime.slice(0, 10)} />
            </div>
        </Layout>
  );
}
