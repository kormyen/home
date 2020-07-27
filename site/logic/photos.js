'use strict';

function Photos()
{
  this.media = null;
  this.content = null;
  this.photoCount;

  this.install = function(media)
  {
    this.media = media;
  }

  this.start = function()
  {
    // let filtered = this.media.filterWithPerson(this.media.db, 'Hamish');
    // let sorted = this.media.sortByQuality(filtered);

    const filtered = this.media.filterNotHeaders(this.media.db);
    const photosOnly = this.media.filterPhotos(filtered);
    this.photoCount = photosOnly.length;

    const sorted = this.media.sortByScore(photosOnly);
    
    // let sorted = this.media.sortByQuality(this.media.db);
    let limited = sorted.slice(0, 3);

    this.content = ``;
    for (var i = 0; i < limited.length; i++)
    {
      this.content += limited[i].html(0);
    }
  }

  this.getCount = function()
  {
    return this.photoCount;
  }

  this.display = function(container)
  {
    container.innerHTML = this.content;
  }
}