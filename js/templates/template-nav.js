function Nav()
{
    this.inline;

    this.install = function(inline)
    {
        this.inline = inline;
    }

    this.double = function(originPage, parentPage, child)
    {
        let result = ``;
        result += `<p class='fontSizeNormal marginTopLarge marginBottomNormal colorMain nav'>`;
        result += `<a href='${this.inline.getInternalUrl('page', originPage.NAME.toUpperCase())}' class='subtleLink'>${originPage.TITL}</a>`;
        result += `<span class='colorSecondary'> / </span>`;
        result += `<a href='${this.inline.getInternalUrl('page', parentPage.NAME.toUpperCase())}' class='subtleLink'>${parentPage.TITL}</a>`;
        result += `<span class='colorSecondary'> / ${child}</span></p>`;
        return result;
    }

    this.single = function(parent, title)
    {
        let result = ``;
        result += `<p class='fontSizeNormal marginTopLarge marginBottomNormal colorMain nav'>`;
        result += `<a href='${this.inline.getInternalUrl('page', parent)}' class='subtleLink'>Home</a>`;
        result += `<span class='colorSecondary'> / ${title}</span></p>`;
        return result;
    }
}