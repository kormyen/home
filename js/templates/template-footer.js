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
        <span>This page was last updated 2023-04-25</span>
        <span>`;
        result += this.inline.parse(`Hamish MacDonald © 2023 {link ext ccbyncsa4}`);
        result += `</span>
      </div>
      `;
    container.innerHTML = result;
  }
}