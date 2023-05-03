'use strict';

function Articles()
{
  this.db = [];
  this.sectors = {};
  this.template;
  const parent = this;

  this.install = function(data, media, runelike, inline, template)
  {
    let tempDb = new Indental(data).parse();
    this.template = template;

    // Parse project db into usable format
    const keys = Object.keys(tempDb);
    for (let k = 0; k < keys.length; k++)
    {
      let element = tempDb[keys[k]];

      element.KEY = keys[k];
      element.NAME = keys[k];
      if (element.TAGS)
      {
        element.TAGS = element.TAGS.split(', ');
        element.TAGS.sort(function(a,b) {
          a = a.toLowerCase();
          b = b.toLowerCase();
          if( a == b) return 0;
          return a < b ? -1 : 1;
        });
      }

      // Body HTML
      element.HtmlBody = runelike.parse(element.BODY);

      // LINKS
      if (element.LINK)
      {
        element.HtmlBody += runelike.parse(['2 Links']);
        element.HtmlBody += runelike.parse(element.LINK);
      }

      // Media
      element.media = media.getByDate(element.HEAD);
 
      // Article HTML
      if (element.PUBL == "true")
      {
        element.HtmlArticle = function()
        {
          let linkUrl = inline.getInternalUrl('post', keys[k].toLowerCase());
          let imageUrl = element.media.pathRelativeSmall;
          let titleText = element.TITL;
          if (element.BREF)
          {
            titleText += ': ' + element.BREF;
          }
          let tagsArray = element.TAGS;
          return parent.template.articleCard(linkUrl, imageUrl, titleText, tagsArray);
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