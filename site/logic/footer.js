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
    result += this.inline.doLink(this.inline.getInternalUrl(`page`, `home`), `Home`, false, 'fontSizeNormal subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'projects'), `Projects`, false, 'fontSizeNormal subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'photos'), `Photos`, false, 'fontSizeNormal subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'log'), `Log`, false, 'fontSizeNormal subtleLink footerItemMargins');
    result += this.inline.doLink(this.inline.getInternalUrl('page', 'hamish'), `About`, false, 'fontSizeNormal subtleLink footerItemMargins');
    return result;
  }
}