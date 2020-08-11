'use strict';

function Posts()
{
  this.articles = null;
  this.content = null;
  this.dbLength;

  this.install = function(articles)
  {
    this.articles = articles;
  }

  this.start = function()
  {
    let all = this.articles.getAll();
    this.dbLength = all.length;
    let limited = all.slice(0, 3);

    this.content = ``;
    for (var i = 0; i < limited.length; i++)
    {
      this.content += limited[i].HtmlArticle(`post`);
    }
  }

  this.getCount = function()
  {
    return this.dbLength;
  }

  this.display = function(container)
  {
    container.innerHTML = this.content;
  }
}