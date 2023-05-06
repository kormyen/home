function Runelike()
{
    this.inline = null;
    this.media = null;
    this.projects = null;
    this.articles = null;
    this.templateLensPhotos = null;
    this.templateLensArticles = null;
	this.templateIndex = new TemplateIndex();
	this.templateCards = new TemplateCards();
    const parent = this;

    const runes =
    {
        't': { tag: 'h2' }, // paragraph title-line 'fontSizeSmall marginTopNormal colorMain'
        '2': { tag: 'h2' },
        '3': { tag: 'h3' },
        'p': { tag: 'p' }, // paragraph normal-line 'fontSizeSmall marginTopNormal colorSecondary'
        '-': { tag: 'bullet' }, // paragraph normal-line 'fontSizeSmall marginTopNormal colorSecondary'
        'q': { tag: 'quote', join: false },
        'i': { tag: 'img', join: false }, // image full-width by-date 'widthFit marginTopNormal radiusNormal'
        'y': { tag: 'yt', join: false },
        'v': { tag: 'vimeo', join: false },
        'b': { tag: 'block' },
        '/': { tag: 'comment' }
    }

    this.install = function(inline, media, projects, articles, templateLensPhotos, templateLensArticles)
    {
        this.inline = inline;
        this.media = media;
        this.projects = projects;
        this.articles = articles;
        this.templateLensPhotos = templateLensPhotos;
        this.templateLensArticles = templateLensArticles;
    }

    this.parse = function(lines = [])
    {
        this.isRunic = function(l)
        {
            const rune = l.substr(0, 1);
            if (rune === ';') { return false } // Comment ;
            // if (l.substr(1, 1) !== ' ') { console.warn('Non-Runic', l); return false; }
            if (!runes[rune]) { console.warn(`Non-Runic[${rune}]`, l); return false; }
            return true;
        }

        this.stash = function(acc, line)
        {
            // Combine same tags into one (so that paragraphs float/flow around images properly)
            const rune = runes[line.substr(0, 1)];
            let lineValue = line.substr(2);
            const prev = acc[acc.length - 1] ? acc[acc.length - 1] : { rune: rune, a: [] };
            if (this.prevRune === rune.tag && rune.join != false)
            {
                prev.a.push(lineValue);
                if (acc.length == 0)
                {
                    // This is the first line (it had nothing previous), add it to accumulation.
                    acc.push(prev);
                }
            }
            else
            {
                acc.push({ rune: rune, a: [lineValue] });
            }

            this.prevRune = rune.tag;
            this.prevLine = lineValue;
            return acc;
        }

        this.toHtml = function(acc, stash)
        {
            let result = '';

            if (stash.rune.tag == 'img')
            {
                for (let i = 0; i < stash.a.length; i++)
                {
                    let imageData = parent.media.getByDate(stash.a[i]);
                    if (!imageData)
                    {
                        console.warn('Cannot find media item: ' + stash.a[i])
                    }
                    result += `${acc} ${imageData.htmlMed}`;
                }
            }
            else if (stash.rune.tag == 'h2')
            {
                result += `${acc}<p class='fontSizeNormal marginTopLarge marginBottomMedium colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br><br>`;
                    }
                    result += `${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'h3')
            {
                result += `${acc}<p class='fontSizeSmall marginTopLarge marginBottomNormal colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br><br>`;
                    }
                    result += `${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'p')
            {
                result += `${acc}<p class='fontSizeSmall marginTopNormal marginBottomNormal colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br><br>`;
                    }
                    result += `${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'quote')
            {
                result += `${acc}<p class='fontSizeSmall marginTopNormal marginBottomNormal colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br><br>`;
                    }
                    result += `${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'bullet')
            {
                result += `${acc}<p class='fontSizeSmall marginTopNormal marginBottomNormal colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br><br>`;
                    }
                    result += `- ${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'br')
            {
                result += `${acc}<p class='fontSizeSmall marginTopNormal colorSecondary'>`;
                for (let i = 0; i < stash.a.length; i++)
                {
                    if (i > 0)
                    {
                        result += `<br>`;
                    }
                    result += `${parent.inline.parse(stash.a[i])}`;
                }
                result += `</p>`;
            }
            else if (stash.rune.tag == 'yt')
            {
                for (let i = 0; i < stash.a.length; i++)
                {
                    result += `${acc}<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/${stash.a[i]}' frameborder='0' allowfullscreen></iframe></div>`;
                }
            }
            else if (stash.rune.tag == 'vimeo')
            {
                for (let i = 0; i < stash.a.length; i++)
                {
                    result += `${acc}<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://player.vimeo.com/video/${stash.a[i]}' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>`;
                }
            }
            else if (stash.rune.tag == 'block')
            {
                const data = stash.a[0].split(' ');
                const func = data[0];

                result += acc;
                if (func == 'projectsLens')
                {
                    let featured = [];
                    for (let i = 1; i < data.length; i++) 
                    {
                        featured.push(parent.projects.get(data[i].toUpperCase()));
                    }
                    result += parent.templateIndex.componentLens('focusContainer', parent.templateLensArticles.getContent(featured));
                }
                else if (func == 'photosLens')
                {
                    result += parent.templateIndex.componentLens('photosContainer', parent.templateLensPhotos.getContent());
                }
                else if (func == 'postsLens')
                {
                    let all = parent.articles.getAll();
                    let featured = [];
                    for (let i = 0; i < Math.min(3, all.length); i++) 
                    {
                        featured.push(all[i]);
                    }
                    result += parent.templateIndex.componentLens('postsContainer', parent.templateLensArticles.getContent(featured));
                }
                else if (func == 'projectsAll')
                {
                    result += parent.templateCards.componentList(parent.projects.getAll());
                }
                else if (func == 'photosAll')
                {
                    result += parent.templateCards.componentList(parent.media.filterPhotos(parent.media.db));
                }
                else if (func == 'postsAll')
                {
                    result += parent.templateCards.componentList(parent.articles.getAll(), 'posts');
                }
            }
            else if (stash.rune.tag == 'comment')
            {
                result += acc;
            }

            return result;
        }

        return lines.filter(this.isRunic).reduce(this.stash, []).reduce(this.toHtml, '');
    }
}