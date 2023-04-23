'use strict';

function TemplateCards()
{
  this.componentList = function(data)
  {
    let result = `<div class='projectList'>`;
    const keys = Object.keys(data);
    for (let k = 0; k < keys.length; k++)
    {
      let element = data[keys[k]];
      result += element.HtmlArticle();
    }
    result += '</div>';

    return result;
  }
}