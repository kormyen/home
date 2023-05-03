'use strict';

function TemplateTags()
{
  this.tagsItemArray = function(iconFile, tagArray)
  {
    let result = ``;
    if (tagArray && tagArray.length > 0 && tagArray[0] != '')
    {
      result += this.tagsSectionStart(iconFile);
      for (let i = 0; i < tagArray.length; i++)
      {
        result += tagArray[i];
        if (i+1 < tagArray.length)
        {
          result += ', ';
        }
      }
      result += this.tagsSectionEnd();
    }
    return result;
  }

  this.tagsItemText = function(iconFile, text)
  {
    let result = ``;
    if (text)
    {
      result += this.tagsSectionStart(iconFile);
      result += text;
      result += this.tagsSectionEnd();
    }
    return result;
  }

  this.tagsSectionStart = function(iconFile)
  {
    let result = ``;
    result += `<span class='metadataItem'>`;
    result += `<img src='/asset/icon/font-awesome/${iconFile}.svg' class='metadataItemIcon'>`;
    return result;
  }

  this.tagsSectionEnd = function()
  {
    return `</span>`;
  }
}