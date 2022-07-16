"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builTableBody = exports.getAnimeListFromAPI = void 0;
const base_url = "https://api.jikan.moe/v4/anime";
// Get information from Anime API
const getAnimeListFromAPI = async (page) => {
    const response = await fetch(`${base_url}?page=${page}`);
    return await response.json();
};
exports.getAnimeListFromAPI = getAnimeListFromAPI;
// const getAnimeListFromAPI = async () => {
//   const res = await fetch("https://kitsu.io/api/edge/anime");
//   return await res.json();
// };
// Information for graphs
const countAnimeByGenre = (animeList) => {
    const data = animeList.data;
    const genres = data === null || data === void 0 ? void 0 : data.map((a) => a.genres);
    console.log(genres);
};
// HTML elements
const buildHTML = (query, htmlElem) => {
    const container = document.querySelector(query);
    container ? (container.innerHTML += htmlElem) : console.log("Container " + query + " not found");
};
const builTableBody = (anime_list) => {
    const animes = anime_list.data;
    animes.forEach((a) => {
        var _a;
        const genres = (_a = a.genres) === null || _a === void 0 ? void 0 : _a.map((g) => g.name).join(", ");
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
exports.builTableBody = builTableBody;
(async () => {
    try {
        const anime_list = await (0, exports.getAnimeListFromAPI)(2);
        const genres = countAnimeByGenre(anime_list);
        console.log(genres);
    }
    catch (error) {
        console.log(error);
    }
})();
