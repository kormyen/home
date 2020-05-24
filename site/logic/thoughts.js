'use strict';

function Thoughts()
{
  this.articles = null;
  this.content = null;

  this.install = function(articles)
  {
    this.articles = articles;
  }

  this.start = function()
  {
    const filtered = this.articles.filterType(`thoughts`);
    let limited = filtered.slice(0, 3);

    this.content = ``;
    for (var i = 0; i < limited.length; i++)
    {
      this.content += limited[i].HtmlArticle(`thought`);
    }
  }

  this.display = function(container)
  {
    container.innerHTML = this.content;
  }
}