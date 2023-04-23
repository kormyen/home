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
        result += `<p class='fontSizeLarge marginTopLarge marginBottomLarge colorMain nav'>`;
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
}