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

export const countAnimesByAiringStatus = (animeList: AnimeList) => {
  return animeList.data
    ?.filter((a: Anime) => a.airing !== null)
    .map((a: Anime) => a.airing)
    .reduce((acc: any, current: boolean) => {
      const curr = current ? "Airing" : "Not Airing";
      acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
      return acc;
    }, {});
};

// filtered anime list

export const filteredDataByAiring = (animeArr: Anime[], value: boolean) => {
  return animeArr.filter((a: Anime) => a.airing === value);
};

export const filteredDataByYear = (animeArr: Anime[], value: number) => {
  return animeArr.filter((a: Anime) => a.year === value);
};

export const filteredDataByGenre = (animeArr: Anime[], value: string) => {
  return animeArr.filter((a: Anime) => a.genres.some((g: Genre) => g.name === value));
};

// HTML elements

export const emptyHTML = (container: string) => {
  const element = document.getElementById(container);
  element && (element.innerHTML = "");
};

export const buildHTML = (query: string, htmlElem: string) => {
  const container = document.getElementById(query);
  container ? (container.innerHTML += htmlElem) : console.log("Container " + query + " not found");
};

export const buildDropdown = (anime_list: AnimeList, container: string, obj: object) => {
  const keys = Object.keys(obj);
  keys.forEach((key: string) => {
    const option = `<option class="dropdown-item" value="${key}">${key}</option>`;
    buildHTML(container, option);
  });
};

export const builTableBody = (animeArr: Anime[]) => {
  emptyHTML("table-body");
  Array.from(animeArr).forEach((a: Anime) => {
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
    buildHTML("table-body", html_anime);
  });
};

// Event listeners

export const addEventListenerToDropdownAiring = (animes: Anime[]) => {
  const airingDropdown = document.querySelector(".airing-drop");
  airingDropdown?.addEventListener("click", (e) => {
    const target = e.target as HTMLOptionElement;
    const selected = target?.value;
    emptyHTML("table-body");
    if (selected === "Airing") {
      const filtered = filteredDataByAiring(animes, true);
      builTableBody(filtered);
    } else if (selected === "Not Airing") {
      const filtered = filteredDataByAiring(animes, false);
      builTableBody(filtered);
    } else {
      builTableBody(animes);
    }
  });
};

export const addEventListenerToDropdownYear = (animes: Anime[]): void => {
  const yearDropdown = document.querySelector(".year-drop");
  yearDropdown?.addEventListener("click", (e) => {
    const target = e.target as HTMLOptionElement;
    const selected = target?.value;
    emptyHTML("table-body");
    if (selected === "All") {
      builTableBody(animes);
    } else {
      const filtered = filteredDataByYear(animes, parseInt(selected));
      builTableBody(filtered);
    }
  });
};

export const addEventListenerToDropdownGenre = (animes: Anime[]) => {
  const genreDropdown = document.querySelector(".genres-drop");
  genreDropdown?.addEventListener("click", (e) => {
    const target = e.target as HTMLOptionElement;
    const selected = target?.value;
    emptyHTML("table-body");
    if (selected === "All") {
      builTableBody(animes);
    } else {
      const filtered = filteredDataByGenre(animes, selected);
      builTableBody(filtered);
    }
  });
};

export const addAllListeners = (animes: Anime[]) => {
  let modAnimes = animes;
  addEventListenerToDropdownAiring(modAnimes);
  addEventListenerToDropdownYear(modAnimes);
  addEventListenerToDropdownGenre(modAnimes);
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
