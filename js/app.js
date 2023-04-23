function App()
{
	this.media = new Media();
	this.media.install();
	this.links = new Links();
	this.links.install();

	this.log = new Log();
	this.inline = new Inline();
	this.runelike = new Runelike();

	this.projects = new Projects();
	this.articles = new Articles();
	this.pages = new Pages();

	this.templateLensPhotos = new TemplateLensPhotos();
	this.templateLensPosts = new TemplateLensPosts();
	this.templateLensFocus = new TemplateLensFocus();

	this.log.install(SHELL, this.inline);
	this.inline.install(this.media, this.links, this.log, this.projects, this.templateLensPhotos, this.templateLensPosts, this.focus);
	this.runelike.install(this.inline, this.media, this.projects, this.articles, this.templateLensPhotos, this.templateLensPosts, this.templateLensFocus);
	this.projects.install(PROJECTS, this.media, this.log, this.runelike, this.inline);
	this.templateLensFocus.install(this.log, this.projects);

	this.templateLensPhotos.install(this.media);
	this.articles.install(ARTICLES, this.media, this.runelike, this.inline);
	this.templateLensPosts.install(this.articles);
	this.pages.install(PAGES, this.runelike, this.inline);

	this.main = document.querySelector('main');
	this.header = new Header();
	this.header.install(document.querySelector('header'));
	
	// this.thoughts = new Thoughts();
	// this.thoughts.install(this.articles);
	// this.notes = new Notes();
	// this.notes.install(this.articles);
	// this.blogs = new Blogs();
	// this.blogs.install(this.articles);

	this.nav = new Nav();
	this.nav.install(this.inline);

	this.templateFooter = new TemplateFooter();
	this.templateFooter.install(this.inline);
	this.templateFooter.display(document.querySelector('footer'));

	this.templateIndex = new TemplateIndex();
	this.templateIndex = new TemplateIndex();

	this.templateMeta = new TemplateMeta();
	this.templateMeta.install(this, document.querySelector('head'));

	this.router = new Router(this);



	// 	else if (target == 'projects')
	// 	{
	// 		let navData = [];
	// 		navData.oneName = `Projects`;
	// 		htmlContent += this.nav.create(navData);
	// 	}
	// 	else if (target == 'photos')
	// 	{
	// 		let htmlContent = ``;

	// 		let navData = [];
	// 		navData.oneName = `Photos`;
	// 		htmlContent += this.nav.create(navData);

	// 		htmlContent += `<div class='projectList'>`;
	// 		let list = this.media.filterPhotos(this.media.db);
	// 		for (let k = 0; k < list.length; k++)
	// 		{
	// 			let element = list[[k]];
	// 			htmlContent += element.htmlColor(0);
	// 		}
	// 		htmlContent += '</div>'; // end projectList

	// 		this.main.innerHTML = htmlContent;
	// 	}
	// 	else if (target == 'posts')
	// 	{
	// 		let data = this.pages.get(target);
	// 		this.header.setImage(this.media.getByDate(data.HEAD));
			
	// 		htmlContent = ``;

	// 		let navData = [];
	// 		navData.oneName = `Posts`;
	// 		htmlContent += this.nav.create(navData);

	// 		htmlContent += `<div class='projectList'>`;
	// 		let list = this.articles.getAll();
	// 		for (let k = 0; k < list.length; k++)
	// 		{
	// 			htmlContent += list[k].HtmlArticle(`post`);
	// 		}

	// 		this.main.innerHTML = htmlContent;
	// 	}
	// 	////////////////////////////////////////////////////////////////////////////////
	// 	// ARTICLE PAGES ///////////////////////////////////////////////////////////////
	// 	////////////////////////////////////////////////////////////////////////////////
	// 	else if (target == 'hamish' || target == 'log')
	// 	{
	// 		let data = this.pages.get(target);
	// 		this.header.setImage(this.media.getByDate(data.HEAD));
	// 		let htmlContent = ``;

	// 		let navData = [];
	// 		navData.oneName = parent.capitalizeFirstLetter(target);
	// 		htmlContent += this.nav.create(navData);

	// 		// Article
	// 		htmlContent += this.pages.buildArticle(data.HtmlSidebar, data.HtmlBody);

	// 		this.main.innerHTML = htmlContent;
	// 	}
	// 	else if (target.substr(0, 7) == 'project')
	// 	{
	// 		target = target.substr(8);
	// 		let data = this.projects.get(target);
	// 		this.header.setImage(data.media[0]);
	// 		let htmlContent = ``;

	// 		// Sidebar
	// 		let navData = [];
	// 		navData.oneName = `Projects`;
	// 		navData.oneLink = this.inline.getInternalUrl('page', 'projects');
	// 		navData.twoName = parent.capitalizeFirstLetter(target);
	// 		htmlContent += this.nav.create(navData);

	// 		// Article
	// 		htmlContent += this.pages.buildArticle(data.HtmlSidebar, data.HtmlBody);

	// 		this.main.innerHTML = htmlContent;
	// 	}
	// 	else if (target.substr(0, 4) == 'post')
	// 	{
	// 		target = target.substr(5);
	// 		target = target.replace(/-/g,` `);
	// 		let data = this.articles.get(target);
	// 		this.header.setImage(data.media);
	// 		let htmlContent = ``;

	// 		// Sidebar
	// 		let navData = [];
	// 		navData.oneName = `Posts`;
	// 		navData.oneLink = this.inline.getInternalUrl('page', 'posts');
	// 		navData.twoName = data.NAME;
	// 		htmlContent += this.nav.create(navData);
			
	// 		// Article
	// 		htmlContent += this.pages.buildArticle(data.HtmlSidebar, data.HtmlBody);

	// 		this.main.innerHTML = htmlContent;
	// 	}
	// 	else
	// 	{
	// 		console.log('Unhandled url');
	// 	}
	// }

	// this.capitalizeFirstLetter = function(string) 
	// {
	// 	string = string.toLowerCase();
	// 	return string.charAt(0).toUpperCase() + string.slice(1);
	// }
}