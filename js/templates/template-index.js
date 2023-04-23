'use strict';

function TemplateIndex()
{
	this.componentNavigation = function(content)
	{
		return `<section class="alignLeft">
			<p class="fontSizeLarge marginTopLarge colorSecondary" id="title">${content}</p>
		</section>`;
	}

	this.componentLens = function(divClass, content)
	{
		return `
			<div class="flexboxRow flexboxWrapToggle trippleArticleContainer ${divClass}">
				${content}
			</div>
		`;
	}
}