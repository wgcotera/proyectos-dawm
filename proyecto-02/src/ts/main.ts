import { AnimeList, Anime, Genre } from "./interfaces/Anime";
const base_url = "https://api.jikan.moe/v4/anime";

// Get information from Anime API

export const getAnimeListFromAPI = async (page: number): Promise<AnimeList> => {
  const response: Response = await fetch(`${base_url}?page=${page}`);
  return await response.json();
};

// Information for graphs

export const countAnimesByGenre = (animeList: AnimeList) => {
  return animeList.data
    ?.flatMap((a: Anime) => a.genres)
    .map((g: Genre) => g.name)
    .reduce((acc: any, curr: string) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});
};

export const countAnimesByYear = (animeList: AnimeList) => {
  return animeList.data
    ?.filter((a: Anime) => a.year !== null)
    .map((a: Anime) => a.year)
    .reduce((acc: any, curr: number) => {
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});
};

export const countAnimesByEpisodes = (animeList: AnimeList) => {
  return animeList.data
    ?.filter((a: Anime) => a.episodes !== null)
    .map((a: Anime) => a.episodes)
    .reduce((acc: any, curr: number) => {
      const current = curr === 1 ? curr + " Episode" : curr + " Episodes";
      acc[current] = acc[current] ? acc[current] + 1 : 1;
      return acc;
    }, {});
};

// HTML elements

export const buildHTML = (query: string, htmlElem: string) => {
  const container = document.querySelector(query);
  container ? (container.innerHTML += htmlElem) : console.log("Container " + query + " not found");
};

export const builTableBody = (anime_list: AnimeList) => {
  const animes = anime_list.data;
  animes.forEach((a: Anime) => {
    const genres = a.genres?.map((g: Genre) => g.name).join(", ");
    const html_anime = `
<tr>
    <td>${a.title}</td>
    <td class="text-center">${a.episodes}</td>
    <td class="text-center">${a.airing}</td>
    <td class="text-center">${a.score}</td>
    <td class="text-center">${a.rank}</td>
    <td class="text-center">${a.year}</td>
    <td class="text-center">${genres}</td>
</tr>
`;
    buildHTML("#table-body", html_anime);
  });
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// (async () => {
//   try {
//     // let anime_list = await getAnimeListFromAPI(1);
//     // const genres = countAnimeByGenre(anime_list);
//     // console.log(anime_list);
//     // console.log(genres);
//     // console.log(countAnimesByYear(anime_list));
//     // console.log(countAnimeByEpisodes(anime_list));
//     // builTableBody(anime_list);
//   } catch (error) {
//     console.log(error);
//   }
// })();
