'use strict';

function TemplateLensPosts()
{
  this.articles = null;
  this.content = null;
  this.dbLength;

  this.install = function(articles)
  {
    this.articles = articles;

    let all = this.articles.getAll();
    this.dbLength = all.length;
    let limited = all.slice(0, 3);

    this.content = ``;
    for (var i = 0; i < limited.length; i++)
    {
      this.content += limited[i].HtmlArticle();
    }
  }

  this.getCount = function()
  {
    return this.dbLength;
  }

  this.getContent = function()
  {
    return this.content;
  }
}