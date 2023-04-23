function Lightbox()
{
	this.media = null;

	this.install = function()
	{
		this.media = new Media();
	    this.media.install();
	}

	this.start = function()
	{
		if(window.location.hash)
		{
			var hash = window.location.hash.substring(1);
			var media = this.media.getByDate(hash);
			document.querySelector('#lightbox').innerHTML = `<img src="media/${ media.file }" class="lightbox-img"></img>`;
		}
		else
		{
			console.log(`media not found`);
			document.querySelector('#lightbox').innerHTML = `media not found`;
		}
	}
}