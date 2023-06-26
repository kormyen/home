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
      result += `
          <div id="footerSocial">
            <a href='https://twitter.com/kormyen' target='_blank'><img src='/asset/icon/external/twitter.svg' class='socialIcon' id='ext'></a>
            <a href='https://github.com/kormyen' target='_blank'><img src='/asset/icon/external/github.svg' class='socialIcon' id='ext'></a>
            <a href='https://merveilles.town/@kor' target='_blank'><img src='/asset/icon/external/merveilles.svg' class='socialIcon' id='ext'></a>
            <a href='https://webring.xxiivv.com/' target='_blank'><img src='/asset/icon/external/webring.svg' class='socialIcon' id='ext'></a>
          </div>`;
    result += `</div>`;
    container.innerHTML = result;
  }
}