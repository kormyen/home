'use strict';

function Articles()
{
  this.db = [];
  this.sectors = {};
  const parent = this;

  this.install = function(data, media, runelike, inline)
  {
    this.db = new Indental(data).parse();

    // Parse project db into usable format
    const keys = Object.keys(this.db);
    for (let k = 0; k < keys.length; k++)
    {
      let element = this.db[keys[k]];

      if (element.NAME == undefined)
      {
        element.NAME = parent.capitalizeFirstLetter(keys[k]);
      }

      // Body HTML
      element.HtmlBody = runelike.parse(element.BODY);

      // Media
      element.media = media.getByDate(element.HEAD);
      // if (element.media.length > 1)
      // {
      //   element.media = media.filterOverview(element.media);
      //   element.media.sort((a, b) => b.quality - a.quality);
      // }
 
      // Article HTML
      if (element.PUBL == "true")
      {
        element.HtmlArticle = function(location)
        {
          let result = `<a href='${inline.getInternalUrl(location, element.NAME.toLowerCase())}' class='article noDecoration'>`;
          result += `<img src='media/small/${element.media.file}' class='articleImg articleBlackAndWhite radiusNormal'></img>`;
          // result += `<span class='fontSizeSmall colorMain marginTopNormal articleTitle'>${parent.capitalizeFirstLetter(element.NAME)}<span id='articleDesc'>: ${element.BREF}</span></span>
          result += `<span class='fontSizeSmall colorMain marginTopNormal articleTitle'>${element.NAME}</span>
            </a>`;

          return result;
        }

        // Sidebar HTML
        element.HtmlSidebar = ``;
        element.HtmlSidebar += `<div class='sidebar fontSizeSmall colorSecondary'>`;
        element.HtmlSidebar += `Posted: ${element.DATE}<br>`;

        if (element.EDIT != null)
        {
          element.HtmlSidebar += `Last edit: ${element.EDIT}<br>`;
        }

        element.HtmlSidebar += `<br>`;
        if (element.TISA != null)
        {
          element.HtmlSidebar += `${element.TISA}<br>`;
        }
        element.HtmlSidebar += `<br>`;

        // LINKS
        if (element.LINK)
        {
          element.HtmlSidebar += `<br>`;
          for (let l = 0; l < element.LINK.length; l++)
          {
            element.HtmlSidebar += inline.parse(element.LINK[l].substr(2));
            element.HtmlSidebar += `<br>`;
          }
        }
      }

			element.HtmlSidebar += `</div>`; // sidebar

      this.db[keys[k]] = element;
    }
  }

  this.filterType = function(query)
  {
    let results = [];

    const keys = Object.keys(this.db);
    for (let k = 0; k < keys.length; k++)
    {
      if ((this.db[keys[k]].PUBL == "true") && (this.db[keys[k]].TYPE == query))
      {
        results.push(this.db[keys[k]]);
      }
    }

    return results;
  }

  this.get = function(query)
  {
    return this.db[query.toUpperCase()];
  }

  this.getAll = function()
  {
    return this.db;
  }

  this.capitalizeFirstLetter = function(string)
  {
      string = string.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
}