// Imports

// Interfaces
import { AnimeList, Anime } from "./interfaces/Anime";

const base_url: string = "https://api.jikan.moe/v4/anime";

const getAnimeList = async (): Promise<AnimeList> => {
  const listResponse = await fetch(base_url);
  return await listResponse.json();
};

const getAnime = (anime_list: AnimeList, mal_id: number): Anime => {
  return anime_list.data[mal_id];
};

async function main() {
  try {
    const anime_list = await getAnimeList();
    let table_body = document.querySelector("#table-body");

    anime_list.data.forEach((anime: Anime) => {
      const animeHTML = `
        <tr>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.mal_id}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.title}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.episodes}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.rank}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.rating}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.status}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.duration}</td>
          <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">${anime.airing}</td>
        </tr>
      `;

      table_body && (table_body.innerHTML += animeHTML);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
