'use strict';

function TemplateArticle(templateTags)
{
  this.templateTags = templateTags;
  
  this.articleCard = function(linkUrl, imageUrl, titleText, tagsArray, createdDate)
  {
    let result = ``;
    result += `<a href='${linkUrl}' class='article noDecoration'>`;
      result += `<div class="img-gradient">`;
        result += `<img src='${imageUrl}' class='articleImg articleBlackAndWhite radiusNormal'></img>`;
      result += `</div>`;

      result += `<div class='articleContent'>`
        result += `<span class='fontSizeSmall colorMain marginTopNormal articleTitle'>${titleText}</span>`;
        result += this.templateTags.tagsItemText(ICON_TIME, createdDate);
        result += this.templateTags.tagsItemArray(ICON_TAG, tagsArray);
      result += `</div>`;

    result += `</a>`;
    return result;
  }
}