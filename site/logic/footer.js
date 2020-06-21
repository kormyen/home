'use strict';

function Footer()
{
  this.inline;

  this.install = function(inline)
  {
    this.inline = inline;
  }

  this.getContent = function()
  {
    let result = ``;
    result += this.inline.doLink(this.inline.getInternalUrl(`page`, `home`), `Home`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'projects'), `Projects`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'photos'), `Photos`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'log'), `Log`, false, 'fontSizeSmall subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'hamish'), `About`, false, 'fontSizeSmall subtleLink footerItemMargins');
    return result;
  }
}