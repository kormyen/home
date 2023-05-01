'use strict';

function TemplateCards()
{
  this.componentList = function(data, optionalParam)
  {
    let result = `<div class='projectList'>`;
    const keys = Object.keys(data);
    for (let k = 0; k < keys.length; k++)
    {
      let element = data[keys[k]];
      if (!optionalParam)
      {
        result += element.HtmlArticle();
      }
      else
      {
        result += element.HtmlArticle(optionalParam);
      }
    }
    result += '</div>';

    return result;
  }
}