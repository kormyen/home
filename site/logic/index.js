function Index()
{
	const parent = this;

	this.media = null;
	this.pages = null;
	this.log = null;
	this.inline = null;
	this.runelike = null;

	this.projects = null;
	this.focus = null;
	this.photos = null;
	this.footer = null;
	
	this.main = null;
	this.header = null;

	this.install = function()
	{
		this.media = new Media();
		this.media.install();
		this.links = new Links();
		this.links.install();

		this.log = new Log();
		this.inline = new Inline();
	    this.projects = new Projects();
		this.runelike = new Runelike();
	    this.pages = new Pages();

		this.log.install(SHELL, this.inline);
		this.inline.install(this.media, this.links, this.log, this.projects);
		this.runelike.install(this.media, this.inline);
	    this.projects.install(PROJECTS, this.media, this.log, this.runelike, this.inline);
		this.pages.install(PAGES, this.runelike, this.inline);

		this.main = document.querySelector('main');
		this.header = new Header();
		this.header.install(document.querySelector('header'));
	    
	    this.focus = new Focus();
		this.focus.install(this.log, this.projects);
		this.photos = new Photos();
		this.photos.install(this.media);
		this.footer = new Footer();
		this.footer.install(this.inline);
	}

	this.start = function()
	{
		document.querySelector('footer').innerHTML = this.footer.getContent();
		this.load();
	}

	this.load = function()
	{
		let hash = window.location.hash;
		let target = hash ? hash.substr(1, hash.length - 1) : '';

		if(target == '')
		{
			// OVERVIEW
			this.focus.start();
			this.photos.start();

			let data = this.pages.get('index');
			this.header.setImage(this.media.getByDate(data.HEAD));

			// LENSES
			this.main.innerHTML = 
				`<section class="alignLeft">
					<p class="fontSizeLarge marginTopLarge colorSecondary"><a class='subtleLink' href="${this.inline.getInternalUrl('page', 'hamish')}">Hamish MacDonald</a> is an Experience Designer</p>
				</section>

				<section class="marginTopLarge">
					<div class="marginBottomNormal fontSizeNormal">
						<span class="colorSecondary">Recent <a class='subtleLink' href="${this.inline.getInternalUrl('page', 'projects')}">projects</a></span>
					</div>
					<div class="flexboxRow flexboxWrapToggle trippleArticleContainer" id="focusContainer"></div>
				</section>

				<section class="marginTopLarge">
					<div class="marginBottomNormal fontSizeNormal">
						<span class="colorSecondary">Recent <a class='subtleLink' href="${this.inline.getInternalUrl('page', 'photos')}">photos</a></span>
					</div>
					<div class="flexboxRow flexboxWrapToggle trippleArticleContainer" id="photoContainer">
					</div>
				</section>`;

			this.focus.display(document.querySelector('#focusContainer'));
			this.photos.display(document.querySelector('#photoContainer'));
		}
		else if (target == 'photos')
		{
			let data = this.pages.get(target);
			this.header.setImage(this.media.getByDate(data.HEAD));

			let htmlContent = ``;
			htmlContent += `<p class='fontSizeLarge marginTopLarge marginBottomLarge colorMain'>
				<a href='${this.inline.getInternalUrl('page', 'home')}' class='subtleLink'>Home</a>
				<span class='colorSecondary'> / Photos</span></p>`;
			htmlContent += `<div class='projectList'>`;

			let list = this.media.filterPhotos(this.media.db);
			for (let k = 0; k < list.length; k++)
			{
				let element = list[[k]];
				htmlContent += element.htmlColor(0);
			}
			htmlContent += '</div>'; // end projectList

			this.main.innerHTML = htmlContent;
		}
		else if (target == 'projects')
		{
			let data = this.pages.get(target);
			this.header.setImage(this.media.getByDate(data.HEAD));
			
			let htmlContent =  `<p class='fontSizeLarge marginTopLarge marginBottomLarge colorMain'>
				<a href='${this.inline.getInternalUrl('page', 'home')}' class='subtleLink'>Home</a>
				<span class='colorSecondary'> / ${parent.capitalizeFirstLetter(target)}</span></p>`;
			htmlContent += `<div class='listContainer'>`;

			htmlContent += `<div class='projectList'>`;
			let list = this.projects.getAll();
			const keys = Object.keys(list);
			for (let k = 0; k < keys.length; k++)
			{
				let element = list[keys[k]];
				htmlContent += element.HtmlArticle();
			}
			htmlContent += '</div>'; // end projectList

			this.main.innerHTML = htmlContent;
		}
		else if (target == 'hamish' || target == 'log')
		{
			let data = this.pages.get(target);
			this.header.setImage(this.media.getByDate(data.HEAD));

			let htmlContent = ``;
			htmlContent +=  `<p class='fontSizeLarge marginTopLarge marginBottomLarge colorMain'>
				<a href='${this.inline.getInternalUrl('page', 'home')}' class='subtleLink'>Home</a>
				<span class='colorSecondary'> / ${parent.capitalizeFirstLetter(target)}</span></p>`;

			htmlContent += `<div class='listContainer'>`;

			htmlContent += data.HtmlSidebar;

			htmlContent += `<div class='articleBody'>`;
			htmlContent += data.HtmlBody;
			htmlContent += `</div>`; // end articleBody

			htmlContent += `</div>`; // end listContainer

			this.main.innerHTML = htmlContent;
		}
		else if (target.substr(0, 7) == 'project')
		{
			target = target.substr(8);
			let data = this.projects.get(target);

			// other page
			this.header.setImage(data.media[0]);
			
			let htmlContent = ``;
			htmlContent += `<p class='fontSizeLarge marginTopLarge marginBottomLarge colorMain'>
				<a href='${this.inline.getInternalUrl('page', 'home')}' class='subtleLink'>Home</a>
				<span class='colorSecondary'> / </span>
				<a href='${this.inline.getInternalUrl('page', 'projects')}' class='subtleLink'>Projects</a>
				<span class='colorSecondary'> / ${parent.capitalizeFirstLetter(target)}</span></p>`;
			
			htmlContent += `<div class='listContainer'>`;

			htmlContent += data.HtmlSidebar;

			htmlContent += `<div class='articleBody'>`;
			htmlContent += data.HtmlBody;
			htmlContent += `</div>`; // end articleBody

			htmlContent += `<div class='articleSpacer'>`;
			htmlContent += `</div>`; // end spacer

			htmlContent += `</div>`; // end listContainer

			this.main.innerHTML = htmlContent;
		}
		else
		{
			console.log('Unhandled url');
		}
	}

	this.capitalizeFirstLetter = function(string) 
	{
		string = string.toLowerCase();
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}