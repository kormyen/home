'use strict';

function TemplateSidebar()
{
  this.inline;

  this.install = function(inline)
  {
    this.inline = inline;
  }

  this.create = function()
  {
    let result = `<div class='sidebar marginBottomLarge'>`
    // result += this.inline.doLink(this.inline.getInternalUrl(`page`, `home`), `Home`, false, 'fontSizeSmall subtleLink');
    //  ▾
    result += `<p class='fontSizeSmall colorSecondary strong'>Home</p>`;
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'projects'), `Projects`, false, 'fontSizeSmall subtleLink marginLeftNormal');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'photos'), `Photos`, false, 'fontSizeSmall subtleLink marginLeftNormal');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'posts'), `Posts`, false, 'fontSizeSmall subtleLink marginLeftNormal');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'hamish'), `Hamish`, false, 'fontSizeSmall subtleLink marginLeftNormal');
    result += `
      <div id="sidebarSocial">
        <a href='https://twitter.com/kormyen' target='_blank'><img src='/asset/icon/external/twitter.svg' class='socialIcon'></a>
        <a href='https://github.com/kormyen' target='_blank'><img src='/asset/icon/external/github.svg' class='socialIcon'></a>
        <a href='https://merveilles.town/@kor' target='_blank'><img src='/asset/icon/external/merveilles.svg' class='socialIcon'></a>
        <a href='https://webring.xxiivv.com/' target='_blank'><img src='/asset/icon/external/webring.svg' class='socialIcon'></a>
      </div>`;
    result += `</div>`;
    return result;
  }
}