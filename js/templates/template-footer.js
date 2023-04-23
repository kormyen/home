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
    result += `<div id="footerContent" class="colorSecondary">`;
    result += this.inline.doLink(this.inline.getInternalUrl(`page`, `home`), `Home`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'projects'), `Projects`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'photos'), `Photos`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'posts'), `Posts`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'hamish'), `Hamish`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += `
      </div>
      <div id="footerSocial" class="floatRight marginLeftFill">
        <a href='https://twitter.com/kormyen' target='_blank'><img src='asset/icon/twitter.svg' class='socialIcon footerItemMargins'></a>
        <a href='https://github.com/kormyen' target='_blank'><img src='asset/icon/github.svg' class='socialIcon footerItemMargins'></a>
        <a href='https://merveilles.town/@kor' target='_blank'><img src='asset/icon/merveilles.svg' class='socialIcon footerItemMargins'></a>
        <a href='https://webring.xxiivv.com/' target='_blank'><img src='asset/icon/webring.svg' class='socialIcon footerItemMargins'></a>
      </div>
      <div id="footerUpdate" class="fontSizeSmall colorSecondary">Last Updated 2023-04-22</div>
      `;
    container.innerHTML = result;
  }
}