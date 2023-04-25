'use strict';

function Header()
{
  this.install = function(container)
  {
    this.container = container;
  }

  this.setImage = function(image)
  { 
    this.container.innerHTML = `<img src='${image.pathRelative}' ${ (image.focus == "T")? 'class="photoTop headerImage"':'class="photoCenter headerImage"' } >`;
    this.container.style.display = 'block';
  }

  this.setEmpty = function(image)
  { 
    this.container.innerHTML = ``;
    this.container.style.display = 'none';
  }
}