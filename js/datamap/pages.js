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
			element.HtmlSidebar += `<div class='sidebar marginBottomLarge'>`;
      element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${element.DESC}</p>`;
      element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${inline.parse(element.DATE)}</p>`;

      // LINKS
      if (element.LINK)
      {
        for (let l = 0; l < element.LINK.length; l++)
        {
          element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${inline.parse(element.LINK[l].substr(2))}</p>`;
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

  this.buildArticle = function(sidebar, content)
  {
    let result = ``;
		result += `<div class='contentContainer'>`;
		result += `<div class='sidebarContainer'>`;
    result += sidebar;
    result += `</div>`; // end sidebarContainer

		result += `<div class='articleContainer'>`;
		result += `<div class='articleBody'>`;
		result += content;
    result += `</div>`; // end articleBody
    result += `</div>`; // end articleContainer
    result += `</div>`; // end contentContainer
    result += `<div class='articleSpacer'></div>`;
    return result;
  }
}