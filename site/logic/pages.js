'use strict';

function Pages()
{
  this.db = null;

  this.install = function(data, runelike, inline)
  {
    this.db = new Indental(data).parse();

    // Parse project db into usable format
    const keys = Object.keys(this.db);
    for (let k = 0; k < keys.length; k++)
    {
      let element = this.db[keys[k]];
      element.NAME = keys[k].toLowerCase();

      // Sidebar HTML
      element.HtmlSidebar = ``;
			element.HtmlSidebar += `<div class='sidebar fontSizeSmall colorSecondary'>`;
      element.HtmlSidebar += `${element.DESC}<br><br>`;
      element.HtmlSidebar += `${inline.parse(element.DATE)}<br><br>`;

      // LINKS
      if (element.LINK)
      {
        for (let l = 0; l < element.LINK.length; l++)
        {
          element.HtmlSidebar += inline.parse(element.LINK[l].substr(2));
          element.HtmlSidebar += `<br><br>`;
        }
      }

			element.HtmlSidebar += `</div>`;

      // Body HTML
      element.HtmlBody = runelike.parse(element.BODY);

      this.db[keys[k]] = element;
    }
  }

  this.get = function(query)
  {
    return this.db[query.toUpperCase()];
  }

  this.getAll = function()
  {
    return this.db;
  }
}