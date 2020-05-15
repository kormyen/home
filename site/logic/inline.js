function Inline()
{
    this.media = null;
    this.links = null;
    this.log = null;
    const parent = this;

    this.install = function(media, links, log, projects)
    {
        this.media = media;
        this.links = links;
        this.log = log;
        this.projects = projects;
    }

    this.getInternalUrl = function(func, name)
    {
        let result = ``;

        if (BUILD)
        {
            if (func == 'project')
            {
                result += `/${func}s/${name}`;
            }
            else if (name == 'home')
            {
                result += `/`;
            }
            else if (func == 'page')
            {
                result += `/${name}`;
            }
        }
        else
        {
            if (func == 'project')
            {
                result += `#${func}-${name}`;
            }
            else if (name == 'home')
            {
                result += `#`;
            }
            else if (func == 'page')
            {
                result += `#${name}`;
            }
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
            return `<a href='${url}' class='${className}' target='_blank'>${label}</a>`;
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
                    const pageName = linkChunks[2];
                    let optionalLabel = '';
                    if (linkChunks[3] != undefined)
                    {
                        optionalLabel = fullText.split("'")[1]; 
                    }
                    
                    if (func == "project" || func == "page")
                    {
                        // INTERNAL LINK
                        const url = parent.getInternalUrl(func, pageName);
                        const label = (optionalLabel == '') ? this.capitalizeFirstLetter(pageName) : optionalLabel;

                        if ((func == "project") && (this.projects.get(pageName) == undefined))
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
                        const label = (optionalLabel == '') ? entry.label : optionalLabel;
                        lineResult += parent.doLink(entry.url, label, true);
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
                            let imageData = parent.media.getByDate(imageDate);
                            lineResult += `${imageData.htmlMedL}`;
                        }
                        else if (param == 'ir')
                        {
                            let imageData = parent.media.getByDate(imageDate);
                            lineResult += `${imageData.htmlMedR}`;
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