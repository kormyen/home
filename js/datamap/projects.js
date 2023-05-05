'use strict';

function Projects()
{
  this.db = null;
  this.sectors = {};
  this.template;
  this.templateTags;
  this.utils;
  const parent = this;
  this.dbLength;

  this.install = function(data, media, log, runelike, inline, template, templateTags, utils)
  {
    this.db = new Indental(data).parse();
    this.template = template;
    this.templateTags = templateTags;
    this.utils = utils;

    // Parse project db into usable format
    const keys = Object.keys(this.db);
    this.dbLength = keys.length;

    for (let k = 0; k < keys.length; k++)
    {
      let element = this.db[keys[k]];
      element.NAME = keys[k].toLowerCase();
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

      if (element.EDIT)
      {
        element.EDIT = element.EDIT.split(', ');
        element.EDIT.sort(function(a,b) 
        {
          return a > b ? -1 : 1;
        });
      }

      // Body HTML
      element.HtmlBody = ``;

      // DATE
      element.HtmlBody += `<div class='infoContainer'>`;

      // UPDATED
      if (element.EDIT)
      {
        element.HtmlBody += this.templateTags.tagsItemText(ICON_EDIT, 'Updated ' + element.EDIT[0]);
      }

      // POSTED
      if (element.DATE)
      {
        element.HtmlBody += this.templateTags.tagsItemText(ICON_TIME, 'Posted ' + element.DATE);
      }

      // TAGS
      if (element.TAGS)
      {
        element.HtmlBody += this.templateTags.tagsItemArray(ICON_TAG, element.TAGS);
      }

      // LOGS
      let projLogStats = log.projects[element.NAME];
      if (projLogStats && projLogStats.hoursTotal > 0)
      {
        element.HtmlBody += this.templateTags.tagsItemText(ICON_LOG, projLogStats.hoursTotal + 'h logged (' + utils.isoString(projLogStats.dateFirst) + ' to ' +  utils.isoString(projLogStats.dateLast) + ')');;
      }

      element.HtmlBody += `</div>`;

      element.HtmlBody += runelike.parse(element.BODY);

      // LINKS
      if (element.LINK)
      {
        element.HtmlBody += runelike.parse(['2 Links']);
        element.HtmlBody += runelike.parse(element.LINK);
      }

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
        let linkUrl = inline.getInternalUrl('project', element.NAME);
        let imageUrl = '';
        if (element.HEAD)
        {
          // Manually set image
          imageUrl = media.getByDate(element.HEAD).pathRelativeSmall;
        }
        else if (element.media.length > 0)
        {
          // Get best project overview image
          imageUrl = element.media[0].pathRelativeSmall;
        }
        else
        {
          // Use default image
          imageUrl = this.app.media.getByDate(DEFAULTIMAGE);
        }
        let titleText = element.TITL;
        if (element.BREF)
        {
          titleText += ': ' + element.BREF;
        }
        let tagsArray = [];
        if (element.TAGS)
        {
          tagsArray = element.TAGS;
        }
        return parent.template.articleCard(linkUrl, imageUrl, titleText, tagsArray)
      }

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