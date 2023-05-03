'use strict';

function TemplateMeta()
{
  this.app = null;
  this.container = null;

  this.install = function(app, container)
  {
    this.app = app;
    this.container = container;

    this.container.innerHTML += `
      <meta name="author" content="Hamish MacDonald">
      <meta name="description" content="">
      <meta name="keywords" content="">

      <meta property="og:title" content="Kor" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Hamish MacDonald - Experience Designer" />
      <meta property="og:image" content="https://kor.nz/media/2019-04-15_15-35.jpg" />
      <meta property="og:image:alt" content="View from the top of Mount Hobson on Great Barrier Island, New Zealand." />
      
      <meta name="twitter:title" content="Kor">
      <meta name="twitter:description" content="Hamish MacDonald - Experience Designer">
      <meta name="twitter:image" content="https://kor.nz/media/2019-04-15_15-35.jpg">
      <meta name="twitter:image:alt" content="View from the top of Mount Hobson on Great Barrier Island, New Zealand.">
      <meta name="twitter:site" content="@kormyen">
      <meta name="twitter:creator" content="@kormyen">
      `;
  }

  this.display = function(data, optionalParent)
  {
    // Title
    let metaTitle = 'Kor'
    if (optionalParent)
    {
      metaTitle += ' - ' + optionalParent;
    }
    if (data.TITL)
    {
      metaTitle += ' - ' + data.TITL;
    }
    document.title = metaTitle;
    document.querySelector('meta[property="og:title"]').setAttribute("content", metaTitle);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", metaTitle);

    // Description
    document.querySelector('meta[name="description"]').setAttribute("content", data.DESC);
    document.querySelector('meta[property="og:description"]').setAttribute("content", data.DESC);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", data.DESC);

    // Keywords
    document.querySelector('meta[name="keywords"]').setAttribute("content", data.TAGS);

    // Image
    let imageName = (data.HEAD) ? data.HEAD : DEFAULTIMAGE;
    let imageData = this.app.media.getByDate(imageName);
    document.querySelector('meta[property="og:image"]').setAttribute("content", imageData.pathAbsolute);
    document.querySelector('meta[name="twitter:image"]').setAttribute("content", imageData.pathAbsolute);

    // Image Alt
    document.querySelector('meta[property="og:image:alt"]').setAttribute("content", imageData.desc);
    document.querySelector('meta[name="twitter:image:alt"]').setAttribute("content", imageData.desc);
  }
}