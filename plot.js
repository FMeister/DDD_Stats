async function plotdata() {
  let data = await Papa.parse("episode_infos.csv", {
    header: true,
    dynamicTyping: true,
    download: true,
    complete: function (results) {
      //       console.log(results.data);
      data = results.data;
    },
  });

  console.log(data);

  PLOT_AREA = document.getElementById("plotArea");

  Plotly.newPlot(
    PLOT_AREA,
    [
      {
        x: [1, 2, 3, 4, 5],

        y: [1, 2, 4, 8, 16],
      },
    ],
    {
      margin: { t: 0 },
    }
  );
}

plotdata();
