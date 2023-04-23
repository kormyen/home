function Router(app)
{
    this.app = app;

    this.locationHandler = function()
    {
        // get the url path
        let location = window.location.pathname;
    
        // if the path length is 0, set it to primary page route
        if (location.length == 0 || location == "/") {
            location = "INDEX";
        }
        else
        {
            location = location.split('/');
            location = location[1];
            location = location.toUpperCase();
        }

        // Get page data
        let page = app.pages.get(location);

        // Set header content
        app.header.setImage(app.media.getByDate(page.HEAD));

        // Set body content
        document.querySelector('main').innerHTML = page.HtmlBody;

        // Set meta content
        app.templateMeta.display(page);
    };
    
    this.route = (event) => {
        event = event || window.event; // get window.event if event argument not provided
        event.preventDefault();
        // window.history.pushState(state, unused, target link);
        window.history.pushState({}, "", event.target.href);
        this.locationHandler();
    };

    // create document click that watches the nav links only
    document.addEventListener("click", (e) => {
        const { target } = e;
        if (!target.matches("a")) {
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