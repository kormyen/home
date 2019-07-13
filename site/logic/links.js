'use strict';

function Links()
{
  this.db = [];

  this.install = function()
  {
    let data = new Tablatal(LINKS).parse();
    this.db = data;
  }

  this.getByName = function(name)
  {
    return this.db.filter(item => item.name == name)[0];
  }
}