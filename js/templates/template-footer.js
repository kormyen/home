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
    let result = `
      <div id="footer" class="fontSizeTiny colorSecondary">
        <span>This website was last updated 2023-04-30</span>
        <span>`;
        result += this.inline.parse(`{link page hamish 'Hamish MacDonald'} © 2023 {link ext ccbyncsa4}`);
        result += `</span>
      </div>
      `;
    container.innerHTML = result;
  }
}