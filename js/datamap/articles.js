'use strict';

function Articles()
{
  this.db = [];
  this.sectors = {};
  this.template;
  this.templateTags;
  const parent = this;

  this.install = function(data, media, runelike, inline, template, templateTags)
  {
    let tempDb = new Indental(data).parse();
    this.template = template;
    this.templateTags = templateTags;

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
      if (element.EDIT)
      {
        element.EDIT = element.EDIT.split(', ');
        element.EDIT.sort(function(a,b) 
        {
          return a > b ? -1 : 1;
        });
      }

      // DATE
      element.HtmlBody = ``;
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
      element.HtmlBody += `</div>`;

      // Body HTML
      element.HtmlBody += runelike.parse(element.BODY);

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