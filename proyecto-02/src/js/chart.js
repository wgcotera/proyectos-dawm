(async () => {
  try {
    let next_page = true;
    let page_number = 1;
    let anime_list = await getAnimeListFromAPI(page_number);

    while (false) {
      const anime_l = await getAnimeListFromAPI(page_number);
      anime_list.data.push(...anime_l.data);
      const years = countAnimesByYear(anime_list);
      const genres = countAnimesByGenre(anime_list);
      const episodes = countAnimesByEpisodes(anime_list);
      // Line Chart
      var ctx = document.getElementById("line").getContext("2d");

      var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, "rgba(72,72,176,0.2)");
      gradientStroke.addColorStop(0.2, "rgba(72,72,176,0.0)");
      gradientStroke.addColorStop(0, "rgba(119,52,169,0)");

      var lineChart = new Chart(ctx, {
        type: "line",
        responsive: true,
        legend: {
          display: false,
        },
        data: {
          labels: Object.keys(years),
          datasets: [
            {
              label: "Animes",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#d048b6",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#d048b6",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: Object.values(years),
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        },
      });

      // Bar Chart
      const barChart = new Chart(document.getElementById("bar"), {
        type: "bar",
        data: {
          labels: Object.keys(genres),
          datasets: [
            {
              label: "Animes",
              data: Object.values(genres),
              backgroundColor: [
                "rgba(255, 26, 104, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(0, 0, 0, 0.2)",
              ],
              borderColor: [
                "rgba(255, 26, 104, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(0, 0, 0, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
        },
      });

      // Pie Chart
      const pieChart = new Chart(document.getElementById("pie"), {
        type: "pie",
        data: {
          labels: Object.keys(episodes),
          datasets: [
            {
              label: "Animes",
              data: Object.values(episodes),
              backgroundColor: [
                "rgba(255, 26, 104, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(0, 0, 0, 0.2)",
              ],
              borderColor: [
                "rgba(255, 26, 104, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(0, 0, 0, 1)",
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
        },
      });

      builTableBody(anime_list);
      await sleep(6000);
      next_page = anime_l.pagination.has_next_page;
      page_number++;
      console.log(next_page);
      console.log(anime_l.pagination);
    }
  } catch (error) {
    console.log(error);
  }
})();
