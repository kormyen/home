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

  this.getLastUpdateText = function(latestDate)
  {
    const SECONDS_IN_DAY = 1000*60*60*24;
    let result = 'Last updated ';

    let dayDiff = Math.round((new Date() - latestDate) / SECONDS_IN_DAY);
    if (dayDiff == 0)
    {
      result += 'today';
    }
    else if (dayDiff == 1)
    {
      result += 'yesterday';
    }
    else if (dayDiff < 0)
    {
      result = 'Updated from the future';
    }
    else 
    {
      result += `${dayDiff} days ago`;
    }

    return result;
  }
}