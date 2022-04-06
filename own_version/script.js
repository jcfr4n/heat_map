// jshint esversion:6

let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";


d3.json(url)
.then(data => callback(data))
.catch(error => console.log(error));

function callback(data){

  console.log(data);

  let baseTemp = data.baseTemperature;
  let values = data.monthlyVariance;

  console.log(values);

  let xScale;
  let yScale;
  
  
  let width = 1200;
  let height = 600;
  let padding = 50;
  
  let svg = d3.select('svg');
  
  svg
    .attr('width',width)
    .attr('height',height);
            
  let generateScales = () => {
    xScale = d3.scaleLinear()
            .range([padding, width - padding]);

    yScale = d3.scaleTime()
            .range([padding, height - padding]);

  };
  
  let drawCells = () => {

    svg
      .selectAll('rect')
      .data(values)
      .enter()
      .append('rect')
      .attr('class','cell')
      .attr('data-month',(item) => item.month -1)
      .attr('data-year', (item) => item.year)
      .attr('data-temp',(item) => item.variance + baseTemp)
      .attr('fill', (item) => {
        if (item.variance <= -1) {
          return 'darkblue';
        }else if (item.variance <= 0) {
          return 'blue';
        }else if (item.variance <= 1) {
          return 'yellow';
        }
        return 'red';
      });
  
  };
  
  let generateAxes = () => {
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .call(xAxis)
      .attr('id','x-axis')
      .attr('transform','translate(0,' + (height - padding) + ')');

    svg
      .append('g')
      .call(yAxis)
      .attr('id','y-axis')
      .attr('transform', 'translate(' + padding + ',0)');
  };

  generateScales();
  generateAxes();
  drawCells();


}