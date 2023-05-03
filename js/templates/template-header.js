'use strict';

function TemplateHeader()
{
  this.templateTags = undefined;
  this.container = undefined;

  this.install = function(templateTags, container)
  {
    this.templateTags = templateTags;
    this.container = container;
  }

  this.setImage = function(image)
  { 
    let result = ``;
    result += `<div class='photoInfoContainer'>`
      result += this.templateTags.tagsItemText(ICON_TIME, image.dateShort);
      result += this.templateTags.tagsItemText(ICON_PHOTOGRAOHER, image.author);
      result += this.templateTags.tagsItemArray(ICON_PERSON, image.people)
      result += this.templateTags.tagsItemArray(ICON_LOCATION, image.locationArray)
    result += `</div>`
    result += `<img src='${image.pathRelative}' ${ (image.focus == "T")? 'class="photoTop headerImage"':'class="photoCenter headerImage"' } >`;

    this.container.innerHTML = result;
    this.container.style.display = 'block';
  }

  this.setEmpty = function(image)
  { 
    this.container.innerHTML = ``;
    this.container.style.display = 'none';
  }
}