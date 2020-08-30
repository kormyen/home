'use strict';

function Projects()
{
  this.db = null;
  this.sectors = {};
  const parent = this;
  this.dbLength;

  this.install = function(data, media, log, runelike, inline)
  {
    this.db = new Indental(data).parse();

    // Parse project db into usable format
    const keys = Object.keys(this.db);
    this.dbLength = keys.length;

    for (let k = 0; k < keys.length; k++)
    {
      let element = this.db[keys[k]];
      element.NAME = keys[k].toLowerCase();

      // Body HTML
      element.HtmlBody = runelike.parse(element.BODY);

      // Media
      element.media = media.filterByProject(media.db, element.NAME);
      if (element.media.length > 1)
      {
        let overviewImages = media.filterOverview(element.media);
        if (overviewImages.length > 0)
        {
          element.media = overviewImages;
        }
        element.media.sort((a, b) => b.quality - a.quality);
      }
 
      // Article HTML
      element.HtmlArticle = function()
      {
        let result = `<a href='${inline.getInternalUrl('project', element.NAME)}' class='article noDecoration'>`;
        if (element.media.length > 0)
        {
          result += `<img src='media/small/${element.media[0].file}' class='articleImg articleBlackAndWhite radiusNormal'></img>`;
        }
        result += `<span class='fontSizeSmall colorMain marginTopNormal articleTitle'>${parent.capitalizeFirstLetter(element.NAME)}<span id='articleDesc'>: ${element.BREF}</span></span>
          </a>`;

        return result;
      }

      // Stats
      let dateFirst;
      let dateLast;
      let projLogStats = log.projects[element.NAME];
      if (projLogStats)
      {
        // this project has log entries!
        // element.LOGS = projLogs;
        
        dateFirst = projLogStats.dateFirst;
        dateLast = projLogStats.dateLast;

        // Sectors
        element.sectors = projLogStats.sectors;
        const sectorKeys = Object.keys(element.sectors);
        sectorKeys.forEach(sk =>
          {
            if (!this.sectors[sk])
            {
              this.sectors[sk] = 0;
            }
            this.sectors[sk]++;
          });
      }

      // Sidebar HTML
      element.HtmlSidebar = ``;
      element.HtmlSidebar += `<div class='sidebar marginBottomLarge'>`;
			element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${parent.capitalizeFirstLetter(element.NAME)} is ${element.TISA}</p>`;

      // DATE
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let stringAge = ``;
      let stringAgeBorn = ``;
      if (dateFirst && dateLast)
      {
        stringAgeBorn = `${dateFirst.getFullYear()} ${monthNames[dateFirst.getMonth()]}`;
      }

      if (element.BORN)
      {
        stringAge += element.BORN;
        if (dateLast)
        {
          stringAge += ` - ${dateLast.getFullYear()}`
        }
      }
      else if (dateFirst && dateLast)
      {
        if (dateFirst.getFullYear() == dateLast.getFullYear())
        {
          stringAge = `${stringAgeBorn} - ${monthNames[dateLast.getMonth()]}`
        }
        else
        {
          stringAge = `${stringAgeBorn} - ${dateLast.getFullYear()} ${monthNames[dateLast.getMonth()]}`
        }
      }
      
      if (stringAge != ``)
      {
        element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${stringAge}</p>`;
      }

      if (projLogStats && projLogStats.hoursTotal > 0)
      {
        element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${ projLogStats.hoursTotal } hours since ${ stringAgeBorn }</p>`;
      }

      // LINKS
      if (element.LINK)
      {
        for (let l = 0; l < element.LINK.length; l++)
        {
          element.HtmlSidebar += `<p class="fontSizeSmall colorSecondary marginBottomMedium">${inline.parse(element.LINK[l].substr(2))}</p>`;
        }
      }

			element.HtmlSidebar += `</div>`; // sidebar

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

  this.getCount = function()
  {
    return this.dbLength;
  }

  this.capitalizeFirstLetter = function(string)
  {
      string = string.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  this.getStats = function()
  {
    let result = ``;

    const keys = Object.keys(this.sectors);
    for (let k = 0; k < keys.length; k++)
    {
      const element = keys[k];
      if (this.sectors[element] > 1)
      {
        result += `${this.sectors[element]}  ${element}<br>`;
      }
    }

    return result;
  }
}