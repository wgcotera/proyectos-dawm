"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builTableBody = exports.buildHTML = exports.countAnimeByEpisodes = exports.countAnimesByYear = exports.countAnimesByGenre = exports.getAnimeListFromAPI = void 0;
const base_url = "https://api.jikan.moe/v4/anime";
// Get information from Anime API
const getAnimeListFromAPI = async (page) => {
    const response = await fetch(`${base_url}?page=${page}`);
    return await response.json();
};
exports.getAnimeListFromAPI = getAnimeListFromAPI;
// Information for graphs
const countAnimesByGenre = (animeList) => {
    var _a;
    return (_a = animeList.data) === null || _a === void 0 ? void 0 : _a.flatMap((a) => a.genres).map((g) => g.name).reduce((acc, curr) => {
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
    }, {});
};
exports.countAnimesByGenre = countAnimesByGenre;
const countAnimesByYear = (animeList) => {
    var _a;
    return (_a = animeList.data) === null || _a === void 0 ? void 0 : _a.filter((a) => a.year !== null).map((a) => a.year).reduce((acc, curr) => {
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
    }, {});
};
exports.countAnimesByYear = countAnimesByYear;
const countAnimeByEpisodes = (animeList) => {
    var _a, _b;
    return (_b = (_a = animeList.data) === null || _a === void 0 ? void 0 : _a.map((a) => a.episodes)) === null || _b === void 0 ? void 0 : _b.reduce((acc, curr) => {
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
    }, {});
};
exports.countAnimeByEpisodes = countAnimeByEpisodes;
// HTML elements
const buildHTML = (query, htmlElem) => {
    const container = document.querySelector(query);
    container ? (container.innerHTML += htmlElem) : console.log("Container " + query + " not found");
};
exports.buildHTML = buildHTML;
const builTableBody = (anime_list) => {
    const animes = anime_list.data;
    animes.forEach((a) => {
        var _a;
        const genres = (_a = a.genres) === null || _a === void 0 ? void 0 : _a.map((g) => g.name).join(", ");
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
        (0, exports.buildHTML)("#table-body", html_anime);
    });
};
exports.builTableBody = builTableBody;
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
