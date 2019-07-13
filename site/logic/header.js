'use strict';

function Header()
{
  this.install = function(container)
  {
    this.container = container;
  }

  this.setImage = function(image)
  { 
    this.container.innerHTML = `<img src='media/${image.file}' ${ (image.focus == "T")? 'class="photoTop headerImage"':'class="photoCenter headerImage"' } >`;
  }
}