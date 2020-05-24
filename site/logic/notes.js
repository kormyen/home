'use strict';

function Notes()
{
  this.articles = null;
  this.content = null;

  this.install = function(articles)
  {
    this.articles = articles;
  }

  this.start = function()
  {
    const filtered = this.articles.filterType(`notes`);
    let limited = filtered.slice(0, 3);
    console.log(limited)

    this.content = ``;
    for (var i = 0; i < limited.length; i++)
    {
      this.content += limited[i].HtmlArticle(`note`);
    }
  }

  this.display = function(container)
  {
    container.innerHTML = this.content;
  }
}