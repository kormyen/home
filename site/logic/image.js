'use strict';

function Image(data)
{
  this.file       = data.date+'.'+data.ext;
  this.desc       = data.description;
  this.date       = data.date;
  this.proj       = data.proj;

  this.parseBinary = function(value)
  {
    return (value == '+') ? true : false;
  }

  this.commaSplit = function(data)
  {
    if (data !== undefined)
    {
      var result = data.split(",");
      for (var c = 0; c < result.length; c++)
      {
        result[c] = result[c].trim();
      }
      return result;
    }
    return data;
  }

  this.photo       = data.pbw.length == 3 ? this.parseBinary(data.pbw.substr(0,1)) : false;
  this.being       = data.pbw.length == 3 ? this.parseBinary(data.pbw.substr(1,1)) : false;
  this.wide        = data.pbw.length == 3 ? this.parseBinary(data.pbw.substr(2,1)) : false;
  
  this.background  = data.moqf.length == 4 ? this.parseBinary(data.moqf.substr(0,1)) : false;
  this.overview    = data.moqf.length == 4 ? this.parseBinary(data.moqf.substr(1,1)) : false;
  this.quality     = data.moqf.length == 4 ? parseInt(data.moqf.substr(2,1)) : 0;
  this.focus       = data.moqf.length == 4 ? data.moqf.substr(3,1) : 0;
  
  this.people      = this.commaSplit(data.people);
  this.tags        = this.commaSplit(data.tags);

  let imageAlign   = "";
  if (this.focus == "T")
  {
    imageAlign = "photoTop ";
  }
  else if (this.focus == "B")
  {
    imageAlign = "photoBottom ";
  }
  else if (this.focus == "1")
  {
    imageAlign = "photoAlignV10 ";
  }
  else if (this.focus == "2")
  {
    imageAlign = "photoAlignV20 ";
  }
  else if (this.focus == "3")
  {
    imageAlign = "photoAlignV30 ";
  }
  else if (this.focus == "4")
  {
    imageAlign = "photoAlignV40 ";
  }
  else if (this.focus == "5")
  {
    imageAlign = "photoAlignV50 ";
  }
  else if (this.focus == "6")
  {
    imageAlign = "photoAlignV60 ";
  }
  else if (this.focus == "7")
  {
    imageAlign = "photoAlignV70 ";
  }
  else if (this.focus == "8")
  {
    imageAlign = "photoAlignV80 ";
  }
  else if (this.focus == "9")
  {
    imageAlign = "photoAlignV90 ";
  }

  if (data.ext == 'mov')
  {
    this.htmlMed = `
      <video width='100%' controls class='widthFit marginTopNormal marginBottomNormal radiusNormal'>
        <source src='media/${ this.file }' type='video/mp4'>
      </video>
    `;
  }
  else
  {
    this.htmlColor = function(stepsBack)
    {
      let steps = ``;
      for (let s = 0; s < stepsBack; s++)
      {
        steps += `../`;
      }

      let result = `<a href='${ steps }media/${ this.date }' class='article'>
        <img src='${ steps }media/small/${ this.file }' class='articleImg ${ imageAlign }radiusNormal' } >
        </a>`;
      return result;
    }
    this.html = function(stepsBack)
    {
      let steps = ``;
      for (let s = 0; s < stepsBack; s++)
      {
        steps += `../`;
      }

      let result = `<a href='${ steps }media/${ this.date }' class='article'>
        <img src='${ steps }media/small/${ this.file }' class='articleImg articleBlackAndWhite ${ imageAlign }radiusNormal' } >
        </a>`;
      return result;
    }
    this.htmlMed     = `<a href='/media/${ this.date }'><img src='media/${ this.file }' class='widthFit marginTopNormal marginBottomNormal ${ imageAlign }radiusNormal' } ></a>`;
    this.htmlMedL    = `<a href='/media/${ this.date }'><img src='media/${ this.file }' class='elementHalfLeft'></a>`;
    this.htmlMedR    = `<a href='/media/${ this.date }'><img src='media/${ this.file }' class='elementHalfRight'></a>`;
  }

  this.roughDatediff = function(first, second)
  {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
  }

  const dateNorm     = new Date(data.date.substr(0, 10));
  const dateToday    = new Date();
  const daysOld      = this.roughDatediff(dateNorm,dateToday);
  // const oldPerc   = 1 - Math.min(daysOld / 3650, 1);
  // const ageScore  = Math.round(oldPerc * 9);
  this.score         = (this.quality * 1000) - daysOld;
}