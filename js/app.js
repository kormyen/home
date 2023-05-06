function App()
{
	this.media = new Media();
	this.media.install();
	this.links = new Links();
	this.links.install();

	this.log = new Log();
	this.inline = new Inline();
	this.runelike = new Runelike();

	this.projects = new Articles();
	this.thoughts = new Articles();
	this.notes = new Articles();
	this.blogs = new Articles();
	this.pages = new Pages();

	this.templateLensPhotos = new TemplateLensPhotos();
	this.templateLensArticles = new TemplateLensFocus();
	this.templateTags = new TemplateTags();
	this.templateArticle = new TemplateArticle(this.templateTags);

	this.log.install(SHELL, this.inline);
	this.inline.install(this.media, this.links, this.log, this.projects, this.templateLensPhotos, this.blogs, this.thoughts, this.notes);
	this.runelike.install(this.inline, this.media, this.projects, this.blogs, this.thoughts, this.notes, this.templateLensPhotos, this.templateLensArticles);
	this.projects.install(PROJECTS, this.media, this.log, this.runelike, this.inline, this.templateArticle, this.templateTags);

	this.templateLensPhotos.install(this.media);
	this.thoughts.install(THOUGHTS, this.media, this.log, this.runelike, this.inline, this.templateArticle, this.templateTags);
	this.notes.install(NOTES, this.media, this.log, this.runelike, this.inline, this.templateArticle, this.templateTags);
	this.blogs.install(BLOGS, this.media, this.log, this.runelike, this.inline, this.templateArticle, this.templateTags);
	this.pages.install(PAGES, this.runelike, this.inline);

	this.main = document.querySelector('main');
	this.templateHeader = new TemplateHeader();
	this.templateHeader.install(this.templateTags, document.querySelector('header'));
	
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