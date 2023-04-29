'use strict';

function Header()
{
  this.install = function(container)
  {
    this.container = container;
  }

  this.setImage = function(image)
  { 
    let result = ``;
    result += `<div class='photoInfoContainer'>`

    // date
    if (image.dateShort)
    {
      result += `<span class='photoInfoItem radiusNormal'>`;
      result += `<img src='asset/icon/font-awesome/clock-solid.svg' class='photoInfoIcon'>`
      result += image.dateShort;
      result += `</span>`;
    }

    // photographer
    if (image.author)
    {
      result += `<span class='photoInfoItem radiusNormal'>`;
      result += `<img src='asset/icon/font-awesome/camera-solid.svg' class='photoInfoIcon'>`
      result += image.author;
      result += `</span>`;
    }
    
    // people
    if (image.people && image.people.length > 0 && image.people[0] != '')
    {
      console.log(image.people)
      let peopleInfo = '';
      for (let i = 0; i < image.people.length; i++) {
        const person = image.people[i];
        peopleInfo += person;
        if (i < image.people.length - 1)
        {
          peopleInfo += ', ';
        }
      }
      result += `<span class='photoInfoItem radiusNormal'>`;
      result += `<img src='asset/icon/font-awesome/user-solid.svg' class='photoInfoIcon'>`
      result += peopleInfo;
      result += `</span>`;
    }

    // location
    let locationInfo = '';
    if (image.location)
    {
      locationInfo += image.location;
    }
    if (image.area)
    {
      if (locationInfo != '')
      {
        locationInfo += ', ';
      }
      locationInfo += image.area;
    }
    if (image.country)
    {
      if (!SHOWHOMECOUNTRY && image.country == HOMECOUNTRY)
      {
        
      }
      else
      {
        if (locationInfo != '')
        {
          locationInfo += ', ';
        }
        locationInfo += image.country;
      }
    }

    if (locationInfo)
    {
      result += `<span class='photoInfoItem radiusNormal'>`;
      result += `<img src='asset/icon/font-awesome/location-dot-solid.svg' class='photoInfoIcon'>`
      result += locationInfo;
      result += `</span>`;
    }

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