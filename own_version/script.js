// jshint esversion:6

/* This project has been did whith the guidance of https://www.youtube.com/watch?v=6uM_wLOayYI and, of course, whith my own addings.
 */

/* Este proyecto ha sido realizado con la guía de https://www.youtube.com/watch?v=6uM_wLOayYI y, por supuesto, con mis propios aportes
 */

let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

// ########################################################################

// This is the request for the JSON file, and the call to the callback function, which is the one that controls the process, according to how we have programmed it.

// Esta es la solicitud del archivo JSON, y la llamada a la función callback, que es la que controla el proceso, según como lo hayamos programado

d3.json(url)
  .then((data) => callback(data))
  .catch((error) => console.log(error));

// ########################################################################

function callback(data) {
  // ########################################################################

  // Here, we define all vars, constants, dictionaries and other all things what we'll need.

  // Aquí, definimos todas las variables, constantes, diccionarios y otras cosas que necesitaremos.

  let baseTemp = data.baseTemperature;
  let values = data.monthlyVariance;

  console.log(values);

  let xScale;
  let yScale;

  let legendXScale;
  let legendYScale;

  let minYear;
  let maxYear;

  let width = 1200;
  let height = 600;
  let padding = 70;

  let svg = d3.select("#svg");

  svg.attr("width", width).attr("height", height);

  let legend = d3.select("#legend");

  legend.attr("width", width / 2).attr("height", height / 8);

  let tooltip = d3
    .select("body")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ########################################################################

  // Here, we generate the scales to use.

  // Aquí, definimos las escalas a usar

  let generateScales = () => {
    minYear = d3.min(values, (item) => {
      return item.year;
    });

    maxYear = d3.max(values, (item) => {
      return item.year;
    });

    xScale = d3
      .scaleLinear()
      .domain([minYear, maxYear + 1])
      .range([padding, width - padding]);

    yScale = d3
      .scaleTime()
      .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
      .range([padding, height - padding]);

    legendXScale = d3
      .scaleLinear()
      .domain([-3, 3])
      .range([padding / 4, width / 2 - padding / 4]);

    legendYScale = d3.scaleLinear().domain([0, 1]).range([20, 40]);
  };

  // ########################################################################

  // Here, we draw the "cell" elements, assign them  their behavior and draw too the "legend" element.

  // Aquí, pintamos los elementos "cell", les asignamos su comportamiento y pintamos también el elemento "legend".

  let drawCells = () => {
    svg
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (item) => item.month - 1)
      .attr("data-year", (item) => item.year)
      .attr("data-temp", (item) => item.variance + baseTemp)
      .attr("fill", (item) => {
        if (item.variance <= -1) {
          return "darkblue";
        } else if (item.variance <= 0) {
          return "lightblue";
        } else if (item.variance <= 1) {
          return "yellow";
        }
        return "red";
      })
      .attr("height", (height - 2 * padding) / 12)
      .attr("y", (item) => {
        return yScale(new Date(0, item.month - 1), 0, 0, 0, 0, 0);
      })
      .attr("width", (width - 2 * padding) / (maxYear - minYear))
      .attr("x", (item) => {
        return xScale(item.year);
      })
      .on("mouseover", (event, item) => {
        tooltip.transition().duration(500).style("opacity", 0.9);

        tooltip
          .html(
            "Año: " +
              item.year +
              "<br>Mes: " +
              monthName[item.month] +
              "<br>Temperatura: " +
              (baseTemp + item.variance)
          )
          .attr("id", "tooltip")
          .attr("data-Year", item.year)
          .style("left", event.pageX + 20 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", (event, item) => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    legend
      .selectAll("rect")
      .data([-3, -2, -1, 0, 1, 2])
      .enter()
      .append("rect")
      .attr("fill", (item) => {
        if (item < -1) {
          return "darkblue";
        } else if (item < 0) {
          return "lightblue";
        } else if (item < 1) {
          return "yellow";
        }
        return "red";
      })
      .attr("height", (item) => {
        return legendYScale(0.2);
      })
      .attr("y", 20)
      .attr("width", (width / 2 - padding / 4) / 6)
      .attr("x", (item) => {
        return legendXScale(item);
      });
  };

  // ########################################################################

  // Generate axis.

  // Generar ejes.

  let generateAxes = () => {
    let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
    let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%B"));
    let legendXAxis = d3.axisBottom(legendXScale).ticks(6);

    svg
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(0," + (height - padding) + ")");

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ",0)");

    legend
      .append("g")
      .call(legendXAxis)
      .attr("id", "legendXAxis")
      .attr("transform", "translate(0," + 40 + ")");
  };

  // ########################################################################

  // Call the diferent functions.

  // Llamar las diferentes funciones.

  generateScales();
  generateAxes();
  drawCells();

  // ########################################################################

  // Add text to "description" element.

  // Agregar texto al elemento "description".

  d3.select("#description").html("Temperatura Base: " + baseTemp);
}
