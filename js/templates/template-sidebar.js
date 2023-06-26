'use strict';

function TemplateSidebar()
{
  this.inline;

  this.install = function(inline)
  {
    this.inline = inline;
  }

  this.display = function(currentPageName)
  {
    let result = `<div class='sidebar marginBottomLarge'>`
    //  ▾▸
    result += this.doPageLabel(ICON_HOME, 'Home', currentPageName == 'Home');
    result += this.doPageLabel(ICON_PROJECTS, 'Projects', currentPageName == 'Projects');
    result += this.doPageLabel(ICON_PHOTOS, 'Photos', currentPageName == 'Photos');
    result += this.doPageLabel(ICON_THOUGHTS, 'Thoughts', currentPageName == 'Thoughts');
    result += this.doPageLabel(ICON_NOTES, 'Notes', currentPageName == 'Notes');
    result += this.doPageLabel(ICON_BLOGS, 'Blogs', currentPageName == 'Blogs');
    result += this.doPageLabel(ICON_HAMISH, 'Hamish', currentPageName == 'Hamish');
    result += this.doPageLabel(ICON_NOW, 'Now', currentPageName == 'Now');
    result += `</div>`;
    return result;
  }

  this.doPageLabel = function(iconFile, pageName, isLink, optionalCss = '')
  {
    if (isLink)
    {
      let result = ``;
      result += `<p class='fontSizeSmall subtleLinkDisabled ${optionalCss}'>`;
      result += `<img src='/asset/icon/font-awesome/${iconFile}.svg' class='metadataItemIcon'>`;
      result += `${pageName}`;
      result += `</p>`;
      return result;
    }
    else
    {
      let result = ``;
      result += `<img src='/asset/icon/font-awesome/${iconFile}.svg' class='metadataItemIcon'>`;
      result += pageName;
      return this.inline.doLink(this.inline.getInternalUrl(`page`, pageName), result, false, 'fontSizeSmall subtleLink ' + optionalCss);
    }
  }
}