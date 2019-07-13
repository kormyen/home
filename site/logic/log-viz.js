'use strict';

function Viz( )
{
  this.cellWidth = 15;
  this.cellHeight = 120;
  this.labelHeight = 10;
  this.labelOffset = 20;
  this.cellSepH = 2;
  this.cellSepV = 10;
  this.radius = 8;
  this.cellSepKey = 40;
  this.bgRgb = 170;
  this.preRows = 52;
  this.gapWidth = 48;
  this.baseExtraBars = 1;
  this.extraBarOffsets = [2,-5,3,0,4,1]

  this.barGraph = function(data, labelVert, labelHori)
  {
    let html = "";

    let maxValue = 0;
    for (var i = 0; i < data.length; i++)
    {
      if (maxValue < data[i].hours)
      {
        maxValue = data[i].hours;
      }
    }

    let prevMonth = '';
    let extraBars = 0;
    let xPos = this.preRows * (this.cellWidth + this.cellSepH);
    let gaps = 0;

    let forcastHours = 0;

    for (var i = 0; i < data.length; i++)
    {
      if (data[i] != null && data[i].hasOwnProperty('gap'))
      {
        gaps ++;
        let labelX = xPos + 28;
        let labelY = 75;
        html += `<text x='${labelX}' y='${labelY}' transform='rotate(-90, ${labelX}, ${labelY})' class='trackergraph-labelGap'>${data[i].gap}</text>`;
        xPos += this.gapWidth;
      }

      if (data[i].hours != undefined && data[i].hours > 0)
      {
        if (data[i].forcast > 0)
        {
          forcastHours = data[i].hours + data[i].forcast;
          let forcastPerc = forcastHours / maxValue;
          let forcastY = this.cellHeight - (this.cellHeight * forcastPerc);
          html += `<rect class='trackergraph-barForcast' x='${xPos}' y='${forcastY}' width='${this.cellWidth}' height='${this.cellHeight * forcastPerc}' rx="${this.radius}" ry="${this.radius}"></rect>`
        }

        let perc = data[i].hours / maxValue;
        let cellY = this.cellHeight - (this.cellHeight * perc);
        html += `<rect class='trackergraph-bar' x='${xPos}' y='${cellY}' width='${this.cellWidth}' height='${this.cellHeight * perc}' rx="${this.radius}" ry="${this.radius}"></rect>`

        if (prevMonth != data[i].month)
        {
          prevMonth = data[i].month;
          html += `<text x='${xPos}' y='${this.cellHeight + this.labelOffset}' class='trackergraph-label'>${prevMonth}</text>`;
          extraBars = this.baseExtraBars;
        }
        else if (extraBars > 0)
        {
          extraBars --;
        }
      }

      xPos += (this.cellWidth + this.cellSepH);
    }

    // Extra forcast bars
    for (var i = 0; i < extraBars; i++)
    {
      let forcastHoursAlt = forcastHours + this.extraBarOffsets[i];
      let forcastPerc = forcastHoursAlt / maxValue;
      let forcastY = this.cellHeight - (this.cellHeight * forcastPerc);
      html += `<rect class='trackergraph-barForcast' x='${xPos}' y='${forcastY}' width='${this.cellWidth}' height='${this.cellHeight * forcastPerc}' rx="${this.radius}" ry="${this.radius}"></rect>`
      xPos += (this.cellWidth + this.cellSepH);
    }
    let bg = this.drawBackground(data, this.radius, this.preRows, extraBars);

    let legend = '';
    let labelX = 10;
    let labelY = 78;
    legend += `<text x='0' y='12' class='trackergraph-labelGap'>${maxValue}</text>`;
    legend += `<text x='${labelX}' y='${labelY}' transform='rotate(-90, ${labelX}, ${labelY})' class='trackergraph-labelGap'>Hours</text>`;
    legend += `<text x='0' y='${this.cellHeight -2}' class='trackergraph-labelGap'>0</text>`;

    return `<div class='trackergraph-legendContainer'>
              <svg xmlns="http://www.w3.org/2000/svg" class='ttrackergraph-legend-svg' width="50" height="${
                this.cellHeight + this.labelOffset + this.labelHeight}" preserveAspectRatio="xMidYMin">${legend}</svg>
            </div>
            <div class='trackergraph-container'>
              <div class='trackergraph-image'>
              <svg xmlns="http://www.w3.org/2000/svg" class='trackergraph-svg' width="${
                (this.cellWidth + this.cellSepH) * data.length 
                + (this.cellWidth + this.cellSepH) * this.preRows 
                + gaps * this.gapWidth
                + (this.cellWidth + this.cellSepH) * extraBars
                }" height="${this.cellHeight + this.labelOffset + this.labelHeight}" preserveAspectRatio="xMidYMin">${bg + html}</svg>
              </div>
            </div>`;
  }

  this.drawBackground = function(data, radius, preRows, postRows)
  {
    let html = "";
    let xPos = 0;

    for (var i = 0; i < preRows; i++)
    {
      html += `<rect class='trackergraph-bar-null' x='${xPos}' y='0' width='${this.cellWidth}' height='${this.cellHeight}' rx="${radius}" ry="${radius}"></rect>`;
      xPos += this.cellWidth + this.cellSepH;
    }

    for (var i = 0; i < data.length; i++)
    {
      if (data[i] != null && data[i].hasOwnProperty('gap'))
      {
        xPos += this.gapWidth;
      }
      html += `<rect class='trackergraph-bar-null' x='${xPos}' y='0' width='${this.cellWidth}' height='${this.cellHeight}' rx="${radius}" ry="${radius}"></rect>`;
      xPos += this.cellWidth + this.cellSepH;
    }

    for (var i = 0; i < postRows; i++)
    {
      html += `<rect class='trackergraph-bar-null' x='${xPos}' y='0' width='${this.cellWidth}' height='${this.cellHeight}' rx="${radius}" ry="${radius}"></rect>`;
      xPos += this.cellWidth + this.cellSepH;
    }
    return html;
  }
}