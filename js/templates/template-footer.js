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
        <p>This page was last updated 2023-04-25</p>
        <p>Hamish MacDonald © 2023 — {link ext ccbyncsa4}</p>
      </div>
      `;
    container.innerHTML = result;
  }
}