'use strict';

function LogEntry(data)
{
  this.cate     = data.category ? data.category : 'Misc';
  this.proj     = data.project;
  this.desc     = data.description;
  this.date     = data.date;
  this.dateObj  = new Date(data.date);

  this.sect     = data.shp.length == 3 ? parseInt(data.shp.substr(0,1)) : 0;
  if (isNaN(this.sect)) { this.sect = 0; }
  this.hour     = data.shp.length == 3 ? parseInt(data.shp.substr(1,1)) : 0;
  this.perc     = data.shp.length == 3 ? parseInt(data.shp.substr(2,1)) : 0;

  this.know     = data.kide.length == 2 ? parseInt(data.kide.substr(0,1)) : 0;
  this.intr     = data.kide.length == 2 ? parseInt(data.kide.substr(1,1)) : 0;
  this.diff     = data.kide.length == 2 ? parseInt(data.kide.substr(2,1)) : 0;
  this.effc     = data.kide.length == 2 ? parseInt(data.kide.substr(3,1)) : 0;

  this.sector   = ["misc","physical","electronics","code","visual","audio","carpentry","research"][this.sect];
  this.colour   = ["#aaaaaa","#333333","#444444","#000000","#555555","#3366cc","#666666","#888888"][this.sect];

  if (isNaN(this.sect)) { this.hour = 0; }
  if (isNaN(this.hour)) { this.hour = 0; }
}