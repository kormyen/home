'use strict';

function TemplateLensFocus()
{
  this.getContent = function(featured)
  {
    let result = ``;
    for (let i = 0; i < Math.min(featured.length, 3); i++)
    {
      result += featured[i].HtmlArticle();
    }
    return result;
  }
}