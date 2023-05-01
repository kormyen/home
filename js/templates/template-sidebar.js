'use strict';

function TemplateSidebar()
{
  this.inline;

  this.install = function(inline)
  {
    this.inline = inline;
  }

  this.display = function(pageName)
  {
    let result = `<div class='sidebar marginBottomLarge'>`
    //  ▾
    // result += this.doPageLabel('Home', pageName == 'Home');
    result += this.doPageLabel('Projects', pageName == 'Projects');
    result += this.doPageLabel('Photos', pageName == 'Photos');
    result += this.doPageLabel('Posts', pageName == 'Posts');
    result += this.doPageLabel('Hamish', pageName == 'Hamish');
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

  this.doPageLabel = function(pageName, isLink, optionalCss = '')
  {
    if (isLink)
    {
      return `<p class='fontSizeSmall subtleLinkDisabled ${optionalCss}'>${pageName}</p>`;
    }
    else
    {
      return this.inline.doLink(this.inline.getInternalUrl(`page`, pageName), pageName, false, 'fontSizeSmall subtleLink ' + optionalCss);
    }
  }
}