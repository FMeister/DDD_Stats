let titles = [];
let comment_counts = [];
let episode_number = [];
let infos = [];

Papa.parse("./episode_infos.csv", {
  download: true,
  header: true,
  dynamicTyping: true,
  complete: function (results) {
    //     console.log(results.data);
    for (let i = 0; i < results.data.length; i++) {
      infos.push(results.data[i]);
      titles.push(results.data[i]["titles"]);
      if (results.data[i]["comment_count"] == undefined) {
        results.data[i]["comment_count"] = 0;
      }
      comment_counts.push(results.data[i]["comment_count"]);
      episode_number.push(results.data[i]["episode_numbers"]);
    }
  },
});

setTimeout(function () {
  let columns = {
    titles: "interval",
    comment_count: "interval",
    episode_numbers: "interval",
  };
  let stats = new Statistics(infos, columns);
  let mean = stats.arithmeticMean("comment_count");
  let median = stats.median("comment_count");
  let stdDev = stats.standardDeviation("comment_count");

  console.log(comment_counts);

  document.getElementById("Mittelwert").innerText =
    "Mittelwert: " + String(mean);
  document.getElementById("Median").innerText = "Median: " + String(median);
  document.getElementById("Standardabweichung").innerText =
    "Standardabweichung: " + String(stdDev);

  PLOT_AREA = document.getElementById("plotArea");

  Plotly.newPlot(
    PLOT_AREA,
    [
      {
        x: episode_number,
        y: comment_counts,
        text: titles,
        type: "bar",
        marker: {
          color: "rgb(158,0,209)",
        },
      },
    ],
    {
      margin: { t: 0 },
      showlegend: false,
      bargap: 0.2,
      xaxis: { title: "Episoden Nummer" },
      yaxis: { title: "Kommentar Anzahl" },
    }
  );
}, 1000);
