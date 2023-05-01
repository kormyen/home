function Router(app)
{
    this.app = app;

    var lastID = null;

    var handleMouseover = function (e)
    {
        var target = e.target || e.srcElement;
        lastID = target.id;
    };

    if (document.addEventListener)
    {
        document.addEventListener('mouseover', handleMouseover, false);
    }
    else
    {
        document.attachEvent('onmouseover', handleMouseover);
    }

    this.locationHandler = function()
    {
        // get the url path
        let request = window.location.pathname;
        let path1 = '';
        let path2 = '';
    
        // if the path length is 0, set it to primary page route
        if (request.length == 0 || request == "/")
        {
            path1 = "INDEX";
        }
        else
        {
            let paths = request.split('/');
            path1 = (paths[1]) ? paths[1].toUpperCase() : '';
            path2 = (paths[2]) ? paths[2].toUpperCase() : '';
        }

        if (!path2)
        {
            let pageData = app.pages.get(path1);
            this.displayPage(pageData);
        }
        else
        {
            if (path1 == 'PROJECTS')
            {
                let pageData = app.projects.get(path2);
                pageData.PRNT = path1;
                this.displayPage(pageData);
            }
            else if (path1 == 'POSTS')
            {
                let pageData = app.articles.get(path2);
                pageData.PRNT = path1;
                this.displayPage(pageData);
            }
        }
    }

    this.displayPage = function(pageData)
    {
        // Set header content
        if (pageData.HEAD)
        {
            app.header.setImage(app.media.getByDate(pageData.HEAD));
        }
        else if (pageData.media && pageData.media.length > 0)
        {
            // Used by projects
            app.header.setImage(pageData.media[0]);
        }
        else
        {
            app.header.setEmpty();
        }

        let htmlContent = ``;

        // Set nav content
        if (pageData.PRNT == 'INDEX')
        {
            app.templateMeta.display(pageData);
            htmlContent += app.nav.single(pageData.PRNT, pageData.TITL)
        }
        else if (pageData.PRNT)
        {
            app.templateMeta.display(pageData, app.capitalizeFirstLetter(pageData.PRNT));
            let parentPageData = app.pages.get(pageData.PRNT);
            let originPageData = app.pages.get(parentPageData.PRNT);
            htmlContent += app.nav.double(originPageData, parentPageData, pageData.TITL)
        }
        else
        {
            // root page
            app.templateMeta.display(pageData);
        }

        // Set body content
        htmlContent += pageData.HtmlBody;
        
        // Set sidebar content
        let sidebar = app.templateSidebar.create(pageData);
        document.querySelector('main').innerHTML = app.pages.buildArticle(sidebar, htmlContent);

        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    
    this.route = (event) => {
        event = event || window.event; // get window.event if event argument not provided
        event.preventDefault();
        // window.history.pushState(state, unused, target link);
        window.history.pushState({}, "", event.target.href);
        this.locationHandler();
    }

    // create document click that watches the nav links only
    document.addEventListener("click", (e) =>
    {
        const { target } = e;
        if (!target.matches("a"))
        {
            if (!target.parentElement.matches("a"))
            {
                // both clicked item, and it's parent are not links, so don't route.
                return;
            }
            else
            {
                // parent of clicked item is a link, we need to update href.
                e.target.href = e.target.parentElement.href;
            }
        }
        if (lastID == 'ext')
        {
            // if external link, then handle normally
            return;
        }
        e.preventDefault();
        this.route();
    });

    // add an event listener to the window that watches for url changes
    window.onpopstate = this.locationHandler;
    // call the urlLocationHandler function to handle the initial url
    window.route = this.route;
    // call the urlLocationHandler function to handle the initial url
    this.locationHandler();
}