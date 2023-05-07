'use strict';

function Media()
{
  this.db = new Array();

  this.install = function()
  {
    let data = new Tablatal(MEDIA).parse();
    for (var i = 0; i < data.length; i++)
    {
      this.db.push(new Image(data[i]));
    }

    this.db.sort(function(a,b) 
    { 
      return ((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
    }).reverse();
  }

  this.filterWithPerson = function(dataset, name)
  {
    return dataset.filter(item => item.people.some(p => p == name));
  }

  this.filterByProject = function(dataset, project)
  {
    return dataset.filter(item => item.proj == project);
  }

  this.filterBackground = function(dataset)
  {
    return dataset.filter(item => item.background == true);
  }
  
  this.filterOverview = function(dataset)
  {
    return dataset.filter(item => item.overview == true);
  }

  this.filterNotHeaders = function(dataset)
  {
    return dataset.filter(item => item.overview == false).filter(item => item.background == false);
  }

  this.filterPhotos = function(dataset)
  {
    let results = dataset.filter(item => item.photo == true);
    // results.sort(function(a,b) 
    // { 
    //   return ((a.date < b.date) ? -1 : ((a.date > b.date) ? 1 : 0));
    // }).reverse();
    return results;
  }

  this.sortByQuality = function(dataset)
  {
    return dataset.sort(function(a,b) { return b.quality - a.quality; });
  }

  this.sortByScore = function(dataset)
  {
    return dataset.sort(function(a,b) { return b.score - a.score; });
  }

  this.getByDate = function(name)
  {
    return this.db.filter(item => item.date == name)[0];
  }
}