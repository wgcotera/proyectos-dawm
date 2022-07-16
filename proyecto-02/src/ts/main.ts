import { AnimeList, Anime, Genre } from "./interfaces/Anime";

const base_url = "https://api.jikan.moe/v4/anime";

// Get information from Anime API

export const getAnimeListFromAPI = async (page: number): Promise<AnimeList> => {
  const response: Response = await fetch(`${base_url}?page=${page}`);
  return await response.json();
};

// const getAnimeListFromAPI = async () => {
//   const res = await fetch("https://kitsu.io/api/edge/anime");
//   return await res.json();
// };

// Information for graphs

const countAnimeByGenre = (animeList: AnimeList) => {
  const data = animeList.data;
  const genres = data?.map((a: Anime) => a.genres);
  console.log(genres);
};

// HTML elements

const buildHTML = (query: string, htmlElem: string) => {
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
    <td>${a.episodes}</td>
    <td>${a.airing}</td>
    <td>${a.duration}</td>
    <td>${a.score}</td>
    <td>${a.rank}</td>
    <td>${genres}</td>
</tr>
`;
    buildHTML("#table-body", html_anime);
  });
};

(async () => {
  try {
    const anime_list = await getAnimeListFromAPI(2);
    const genres = countAnimeByGenre(anime_list);
    console.log(genres);
  } catch (error) {
    console.log(error);
  }
})();
