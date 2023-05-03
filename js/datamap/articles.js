'use strict';

function Articles()
{
  this.db = [];
  this.sectors = {};
  const parent = this;

  this.install = function(data, media, runelike, inline)
  {
    let tempDb = new Indental(data).parse();

    // Parse project db into usable format
    const keys = Object.keys(tempDb);
    for (let k = 0; k < keys.length; k++)
    {
      let element = tempDb[keys[k]];

      element.KEY = keys[k];
      element.NAME = keys[k];

      // Body HTML
      element.HtmlBody = runelike.parse(element.BODY);

      // Media
      element.media = media.getByDate(element.HEAD);
 
      // Article HTML
      if (element.PUBL == "true")
      {
        element.HtmlArticle = function()
        {
          let result = `<a href='${inline.getInternalUrl('post', keys[k].toLowerCase())}' class='article noDecoration'>`;
          result += `<div class="img-gradient">`;
          result += `<img src='media/small/${element.media.file}' class='articleImg articleBlackAndWhite radiusNormal'></img>`;
          result += `</div>`;
          result += `<span class='fontSizeSmall colorMain marginTopNormal articleTitle'>${element.TITL}</span>`;
          result += `</a>`;

          return result;
        }

        // Sidebar HTML
        element.HtmlSidebar = ``;
        element.HtmlSidebar += `<div class='sidebar marginBottomLarge'>`;
        element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">Posted: ${element.DATE}</p>`;

        if (element.EDIT != null)
        {
          element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">Edited: ${element.EDIT}</p>`;
        }

        if (element.TISA != null)
        {
          element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${inline.parse(element.TISA)}</p>`;
        }

        // LINKS
        if (element.LINK)
        {
          for (let l = 0; l < element.LINK.length; l++)
          {
            element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${inline.parse(element.LINK[l].substr(2))}</p>`;
          }
        }
      }

			element.HtmlSidebar += `</div>`; // sidebar

      if (element.PUBL == "true")
      {
        this.db.push(element);
      }
    }

    // Sort by date
    this.db.sort(function(a,b) 
    { 
      return ((a.DATE < b.DATE) ? -1 : ((a.DATE > b.DATE) ? 1 : 0));
    }).reverse();
  }

  this.filterType = function(query)
  {
    let results = [];

    for (let k = 0; k < this.db.length; k++)
    {
      if ((this.db[k].PUBL == "true") && (this.db[k].TYPE == query))
      {
        results.push(this.db[k]);
      }
    }

    return results;
  }

  this.get = function(query)
  {
    query = query.replaceAll('-', ' ');
    for (let k = 0; k < this.db.length; k++)
    {
      if (this.db[k].KEY == query.toUpperCase())
      {
        return this.db[k];
      }
    }
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