'use strict';

function TemplateFooter()
{
  this.inline;

  this.install = function(inline)
  {
    this.inline = inline;
  }

  this.display = function(container)
  {
    let result = ``;
    result += `<div id="footer" class="fontSizeTiny colorSecondary">`;
      result += `<span>`;
        result += this.inline.parse(`{link page hamish 'Hamish MacDonald'} © 2023`);
      result += `</span>`;
    result += `</div>`;
    container.innerHTML = result;
  }
}