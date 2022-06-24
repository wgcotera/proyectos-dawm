"use strict";
// Imports
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_url = "https://api.jikan.moe/v4/anime";
const getAnimeList = () => __awaiter(void 0, void 0, void 0, function* () {
    const listResponse = yield fetch(base_url);
    return yield listResponse.json();
});
const getAnime = (anime_list, mal_id) => {
    return anime_list.data[mal_id];
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const anime_list = yield getAnimeList();
            console.log(anime_list);
            let table_body = document.querySelector("#table-body");
            anime_list.data.forEach((anime) => {
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
                table_body.innerHTML += animeHTML;
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
main();
