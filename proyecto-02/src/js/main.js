"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.addEventListenerToDropdownGenre = exports.addEventListenerToDropdownYear = exports.addEventListenerToDropdownAiring = exports.builTableBody = exports.buildDropdown = exports.buildHTML = exports.emptyHTML = exports.filteredDataByGenre = exports.filteredDataByYear = exports.filteredDataByAiring = exports.countAnimesByAiringStatus = exports.countAnimesByEpisodes = exports.countAnimesByYear = exports.countAnimesByGenre = exports.getAnimeListFromAPI = void 0;
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
const countAnimesByEpisodes = (animeList) => {
    var _a;
    return (_a = animeList.data) === null || _a === void 0 ? void 0 : _a.filter((a) => a.episodes !== null).map((a) => a.episodes).reduce((acc, curr) => {
        const current = curr === 1 ? curr + " Episode" : curr + " Episodes";
        acc[current] = acc[current] ? acc[current] + 1 : 1;
        return acc;
    }, {});
};
exports.countAnimesByEpisodes = countAnimesByEpisodes;
const countAnimesByAiringStatus = (animeList) => {
    var _a;
    return (_a = animeList.data) === null || _a === void 0 ? void 0 : _a.filter((a) => a.airing !== null).map((a) => a.airing).reduce((acc, current) => {
        const curr = current ? "Airing" : "Not Airing";
        acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
        return acc;
    }, {});
};
exports.countAnimesByAiringStatus = countAnimesByAiringStatus;
// filtered anime list
const filteredDataByAiring = (animeArr, value) => {
    return animeArr.filter((a) => a.airing === value);
};
exports.filteredDataByAiring = filteredDataByAiring;
const filteredDataByYear = (animeArr, value) => {
    return animeArr.filter((a) => a.year === value);
};
exports.filteredDataByYear = filteredDataByYear;
const filteredDataByGenre = (animeArr, value) => {
    return animeArr.filter((a) => a.genres.some((g) => g.name === value));
};
exports.filteredDataByGenre = filteredDataByGenre;
// HTML elements
const emptyHTML = (container) => {
    const element = document.getElementById(container);
    element && (element.innerHTML = "");
};
exports.emptyHTML = emptyHTML;
const buildHTML = (query, htmlElem) => {
    const container = document.getElementById(query);
    container ? (container.innerHTML += htmlElem) : console.log("Container " + query + " not found");
};
exports.buildHTML = buildHTML;
const buildDropdown = (anime_list, container, obj) => {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        const option = `<option class="dropdown-item" value="${key}">${key}</option>`;
        (0, exports.buildHTML)(container, option);
    });
};
exports.buildDropdown = buildDropdown;
const builTableBody = (animeArr) => {
    (0, exports.emptyHTML)("table-body");
    Array.from(animeArr).forEach((a) => {
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
        (0, exports.buildHTML)("table-body", html_anime);
    });
};
exports.builTableBody = builTableBody;
// Event listeners
const addEventListenerToDropdownAiring = (animes) => {
    const airingDropdown = document.querySelector(".airing-drop");
    airingDropdown === null || airingDropdown === void 0 ? void 0 : airingDropdown.addEventListener("click", (e) => {
        const target = e.target;
        const selected = target === null || target === void 0 ? void 0 : target.value;
        console.log(selected);
        (0, exports.emptyHTML)("table-body");
        if (selected === "Airing") {
            const filtered = (0, exports.filteredDataByAiring)(animes, true);
            (0, exports.builTableBody)(filtered);
        }
        else if (selected === "Not Airing") {
            const filtered = (0, exports.filteredDataByAiring)(animes, false);
            (0, exports.builTableBody)(filtered);
        }
        else {
            (0, exports.builTableBody)(animes);
        }
    });
};
exports.addEventListenerToDropdownAiring = addEventListenerToDropdownAiring;
const addEventListenerToDropdownYear = (animes) => {
    const yearDropdown = document.querySelector(".year-drop");
    yearDropdown === null || yearDropdown === void 0 ? void 0 : yearDropdown.addEventListener("click", (e) => {
        const target = e.target;
        const selected = target === null || target === void 0 ? void 0 : target.value;
        console.log(selected);
        (0, exports.emptyHTML)("table-body");
        if (selected === "All") {
            (0, exports.builTableBody)(animes);
        }
        else {
            const filtered = (0, exports.filteredDataByYear)(animes, parseInt(selected));
            (0, exports.builTableBody)(filtered);
        }
    });
};
exports.addEventListenerToDropdownYear = addEventListenerToDropdownYear;
const addEventListenerToDropdownGenre = (animes) => {
    const genreDropdown = document.querySelector(".genres-drop");
    genreDropdown === null || genreDropdown === void 0 ? void 0 : genreDropdown.addEventListener("click", (e) => {
        const target = e.target;
        const selected = target === null || target === void 0 ? void 0 : target.value;
        console.log(selected);
        (0, exports.emptyHTML)("table-body");
        if (selected === "All") {
            (0, exports.builTableBody)(animes);
        }
        else {
            const filtered = (0, exports.filteredDataByGenre)(animes, selected);
            console.log(filtered);
            (0, exports.builTableBody)(filtered);
        }
    });
};
exports.addEventListenerToDropdownGenre = addEventListenerToDropdownGenre;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
exports.sleep = sleep;
(async () => {
    try {
        // const anime_list = await getAnimeListFromAPI(1);
        // const filtered = filteredDataByAiring(anime_list.data, true);
        // console.log(filtered);
    }
    catch (error) {
        console.log(error);
    }
})();
