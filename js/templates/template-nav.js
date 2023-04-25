function Nav()
{
    this.inline;

    this.install = function(inline)
    {
        this.inline = inline;
    }

    this.create = function(data)
    {
        let result = ``;
        result += `<p class='fontSizeNormal marginTopLarge marginBottomLarge colorMain nav'>`;
        result += `<a href='${this.inline.getInternalUrl('page', 'home')}' class='subtleLink'>Home</a>`;

        if (data.twoName == null)
        {
            result += `<span class='colorSecondary'> / ${data.oneName}</span></p>`;
        }
        else 
        {
			result += `<span class='colorSecondary'> / </span>`;
			result += `<a href='${data.oneLink}' class='subtleLink'>${data.oneName}</a>`;
			result += `<span class='colorSecondary'> / ${data.twoName}</span></p>`;
        }
        
        return result;
    }

    this.single = function(parent, title)
    {
        let result = ``;
        result += `<p class='fontSizeNormal marginTopLarge marginBottomLarge colorMain nav'>`;
        result += `<a href='${this.inline.getInternalUrl('page', parent)}' class='subtleLink'>Home</a>`;
        result += `<span class='colorSecondary'> / ${title}</span></p>`;
        return result;
    }
}