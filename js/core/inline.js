function Inline()
{
    this.media = null;
    this.links = null;
    this.log = null;
    this.projects = null;
    this.photos = null;
    this.blogs = null;
    this.thoughts = null;
    this.notes = null;
    const parent = this;

    this.install = function(media, links, log, projects, photos, blogs, thoughts, notes)
    {
        this.media = media;
        this.links = links;
        this.log = log;
        this.projects = projects;
        this.photos = photos;
        this.blogs = blogs;
        this.thoughts = thoughts;
        this.notes = notes;
    }

    this.getInternalUrl = function(func, name)
    {
        let result = ``;

        if (name.toUpperCase() == 'INDEX')
        {
            result += `/`;
        }
        else if (func == 'page')
        {
            if (name.toUpperCase() == 'HOME')
            {
                result += `/`;
            }
            else
            {
                result += `/${name.toLowerCase()}`;
            }
        }
        else if (func == 'project' || func == 'thought' || func == 'note' || func == 'blog')
        {
            result += `/${func}s/${name.replace(/ /g, `-`).toLowerCase()}`;
        }

        return result;
    }

    this.doLink = function(url, label, ext, className)
    {
        if (!className)
        {
            className = 'subtleLink';
        }

        if (ext)
        {
            return `<a href='${url}' class='${className}' target='_blank' id='ext'>${label}</a>`;
        }
        else
        {
            return `<a href='${url}' class='${className}'>${label}</a>`;
        }
    }

    this.parse = function(line)
    {
        let lineResult = '';

        if (line != null)
        {
            this.capitalizeFirstLetter = function(string)
            {
                string = string.toLowerCase();
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            let split = line.split('{').join('}').split('}');

            for (let i = 0; i < split.length; i++)
            {
                let chunk = split[i].substr(0, 4);
                if (chunk == 'link')
                {
                    // LINK
                    const fullText = split[i];
                    const linkChunks = fullText.split(' ');
                    const func = linkChunks[1];

                    const urlName = linkChunks[2];
                    const textName = urlName.replace('-', ' ');
                    const queryName = textName.toUpperCase();

                    let optionalLabel = '';
                    if (linkChunks[3] != undefined)
                    {
                        optionalLabel = fullText.split("'")[1]; 
                    }
                    
                    if (func == "project" || func == "page" || func == "thought" || func == "note" || func == "blog")
                    {
                        // INTERNAL LINK
                        const url = parent.getInternalUrl(func, urlName);
                        const label = (optionalLabel == '') ? textName : optionalLabel;

                        if ((func == "project") && (this.projects.get(queryName) == undefined))
                        {
                            // Requested project link but no project... so no link for you!
                            lineResult += `${label}`;
                        }
                        else
                        {
                            // Normals
                            lineResult += parent.doLink(url, label);
                        }
                    }
                    else if (func == "ext")
                    {
                        // EXTERNAL LINK
                        const linkName = linkChunks[2];
                        const entry = parent.links.getByName(linkName);
                        let label = '';
                        label += '^';
                        label += (optionalLabel == '') ? entry.label : optionalLabel;
                        lineResult += parent.doLink(entry.url, label, true);
                    }
                }
                else if (chunk == 'stat')
                {
                    const fullText = split[i];
                    const linkChunks = fullText.split(' ');
                    const func = linkChunks[1];
                    if (func == "projectsTotal")
                    {
                        lineResult += this.projects.getCount();
                    }
                    else if (func == "photosTotal")
                    {
                        lineResult += this.photos.getCount();
                    }
                    else if (func == "blogsTotal")
                    {
                        lineResult += this.blogs.getCount();
                    }
                    else if (func == "thoughtsTotal")
                    {
                        lineResult += this.thoughts.getCount();
                    }
                    else if (func == "notesTotal")
                    {
                        lineResult += this.notes.getCount();
                    }
                }
                else if (chunk == 'year')
                {
                    lineResult += new Date().getFullYear();
                }
                else
                {
                    chunk = split[i].substr(0, 5);

                    if (chunk == 'image')
                    {
                        // IMAGE
                        const imageChunks = split[i].split(' ');
                        const imageDate = imageChunks[1];
                        let param = '';
                        if (imageChunks.length > 2)
                        {
                            param = imageChunks[2];
                        }

                        if (param == 'il')
                        {
                            console.log('il!');
                            console.log(imageChunks);
                        }
                        else if (param == 'ir')
                        {
                            console.log('ir!');
                            console.log(imageChunks);
                        }
                    }
                    else
                    {
                        chunk = split[i].substr(0, 7);

                        if (chunk == 'tracker')
                        {
                            chunk = split[i].substr(8);
                            
                            if (chunk == "week graph")
                            {
                                lineResult += `<div class="graphContainer">`;
                                lineResult += parent.log.display();
                                lineResult += `</div>`;
                            }
                            else if (chunk == "project percentages")
                            {
                                lineResult += parent.log.projPercStats();
                            }
                            else if (chunk == "sector percentages")
                            {
                                lineResult += parent.log.sectPercStats();
                            }
                            else if (chunk == "lastUpdateText")
                            {
                                lineResult += parent.log.getLastUpdateText();
                            }
                        }
                        else
                        {
                            // STANDARD TEXT
                            lineResult += split[i];
                        }
                    }
                }
            }
        }

        return lineResult;
    }
}