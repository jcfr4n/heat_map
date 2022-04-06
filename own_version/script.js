// jshint esversion:6

let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

let height = 500;
let width = 1000;
let padding = 70;

let xScale;
let xAxis;
let yScale;
let yAxis;

let colorBrewer = [
  '#543005',
  '#8c510a',
  '#bf812d',
  '#dfc27d',
  '#f6e8c3',
  '#f5f5f5',
  '#c7eae5',
  '#80cdc1',
  '#35978f',
  '#01665e',
  '#003c30'
];

function drawSvg() {
  d3.select("#svg")
    .attr("width", width + "px")
    .attr("height", height + "px")
    .style("background-color", "darkviolet");
}

function createScales(data) {
  xScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (item) => {
        return item.year - 1;
      }),
      d3.max(data, (item) => {
        return item.year + 1;
      }),
    ])
    .range([0, width - 2 * padding]);
  yScale = d3
    .scaleBand()
    // months
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    .range([0, height - 2 * padding]);
}

function drawAxes() {
  xAxis = d3.axisBottom(xScale).tickFormat(d3.format('D'));

  d3.select("#svg")
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr(
      "transform",
      "translate(" + padding + ", " + (height - padding) + ")"
    );
    d3.select('#x-axis')
    .append('text')
    .text('Years')
    .style('text-anchor','middle')
    .attr('x', width - 2 * padding)
    .attr('y', -10)
    .attr('fill','black');

  yAxis = d3
    .axisLeft(yScale)
    .tickValues(yScale.domain())
    .tickFormat(function (month) {
      let date = new Date(0);
      date.setUTCMonth(month);
      let format = d3.timeFormat("%B");
      return format(date);
    })
    .tickSize(10, 1);

  d3.select("#svg")
    .append("g")
    .classed("y-axis", true)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ", " + padding + ")")
    .call(yAxis)
    .append("text")
    .text("Months")
    .attr('transform','translate(' + 0 + ', ' + -10 + ')')
    .style("text-anchor", "middle")
    .attr("fill", "black");
}

function drawLegend(data) {
  
  let legendColors = colorBrewer.reverse();
  let legendWidth = 400;
  let legendHeight = 300/legendColors.length;

  let variance = data.monthlyVariance.map(function (val) {
    return val.variance;
  });

  console.log(variance);

  let minTemp = data.baseTemperature + d3.min(variance);
  let maxTemp = data.baseTemperature + d3.max(variance);

  console.log('minTemp: ' + minTemp);
  console.log('maxTemp: ' + maxTemp);

  let legendThreshold = d3
      .scaleThreshold()
      .domain(
        (function (min, max, count) {
          var array = [];
          var step = (max - min) / count;
          var base = min;
          for (var i = 1; i < count; i++) {
            array.push(base + i * step);
          }
          return array;
        })(minTemp, maxTemp, legendColors.length)
      )
      .range(legendColors);


  console.log('legendThreshold: ' + legendThreshold(3));
  
  let legendX = d3
      .scaleLinear()
      .domain([minTemp, maxTemp])
      .range([0, legendWidth]);


  console.log('legendX: ' + legendX(13));
  
  let legendXAxis = d3
      .axisBottom()
      .scale(legendX)
      .tickSize(10, 0)
      .tickValues(legendThreshold.domain())
      .tickFormat(d3.format('.1f'));

  d3.select('#svg')
      .append('g')
      .classed('legend', true)
      .attr('id', 'legend')
      .attr(
        'transform',
        'translate(' +
          padding +
          ',' +
          (height - 2 * legendHeight) +
          ')'
      );

  d3.select('#svg')
      .append('g')
      .selectAll('rect')
      .data(
        legendThreshold.range().map(function (color) {
          var d = legendThreshold.invertExtent(color);
          if (d[0] === null) {
            d[0] = legendX.domain()[0];
          }
          if (d[1] === null) {
            d[1] = legendX.domain()[1];
          }
          return d;
        })
      )
      .enter()
      .append('rect')
      .style('fill', function (d) {
        return legendThreshold(d[0]);
      })
      .attr('x', (d) => { return isNaN(legendX(d[0])) ? 0 : legendX(d[0]) + 300;})
      .attr('y', 20)
      .attr('width', (d) =>
        d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : legendX(null)
      )
      .attr('height', legendHeight);

  d3.select('#svg')
      .append('g')
      .attr('transform', 'translate(' + 300 + ',' + 2 * legendHeight + 20 +')')
      .call(legendXAxis);
}

// hay que estudiarlo más
/* 
function representData(data, baseTemperature) {
  d3.select('#svg')
      .append('g')
      .attr('transform', 'translate(' + padding + ',' + padding + ')')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('data-month', function (d) {
        return d.month;
      })
      .attr('data-year', function (d) {
        return d.year;
      })
      .attr('data-temp', function (d) {
        return baseTemperature + d.variance;
      })
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.month))
      .attr('width', (d) => xScale(d.year))
      .attr('height', (d) => yScale(d.month))
      .attr('fill', function (d) {
        return drawLegend.legendThreshold(baseTemperature + d.variance);
  })
  .on('mouseover', function (event, d) {
    var date = new Date(d.year, d.month);
    var str =
      "<span class='date'>" +
      d3.timeFormat('%Y - %B')(date) +
      '</span>' +
      '<br />' +
      "<span class='temperature'>" +
      d3.format('.1f')(data.baseTemperature + d.variance) +
      '&#8451;' +
      '</span>' +
      '<br />' +
      "<span class='variance'>" +
      d3.format('+.1f')(d.variance) +
      '&#8451;' +
      '</span>';
    tip.attr('data-year', d.year);
    tip.show(str, this);
  })
  .on('mouseout', tip.hide);
}
 */
d3.json(url)
  .then((data) => {
    drawSvg();
    createScales(data.monthlyVariance);
    drawAxes();
    drawLegend(data);
    representData(data.monthlyVariance, data.baseTemperature);
  });
