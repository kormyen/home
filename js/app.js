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
	this.templateTags = new TemplateTags();
	this.templateArticle = new TemplateArticle(this.templateTags);

	this.log.install(SHELL, this.inline);
	this.inline.install(this.media, this.links, this.log, this.projects, this.templateLensPhotos, this.templateLensPosts, this.focus);
	this.runelike.install(this.inline, this.media, this.projects, this.articles, this.templateLensPhotos, this.templateLensPosts, this.templateLensFocus);
	this.projects.install(PROJECTS, this.media, this.log, this.runelike, this.inline, this.templateArticle);
	this.templateLensFocus.install(this.log, this.projects);

	this.templateLensPhotos.install(this.media);
	this.articles.install(ARTICLES, this.media, this.runelike, this.inline, this.templateArticle);
	this.templateLensPosts.install(this.articles);
	this.pages.install(PAGES, this.runelike, this.inline);

	this.main = document.querySelector('main');
	this.templateHeader = new TemplateHeader();
	this.templateHeader.install(this.templateTags, document.querySelector('header'));
	
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

	this.templateSidebar = new TemplateSidebar();
	this.templateSidebar.install(this.inline);

	this.router = new Router(this);

	this.capitalizeFirstLetter = function(string) 
	{
		string = string.toLowerCase();
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
}