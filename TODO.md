## FIX
- log project page content doesn't load properly
- home page photo arcticle card should work with lightbox

## Add
- projects/articles page tags and dates
- Better content for Sylo proj
- Better content for Swordy proj
- Update README

## FIX
- Fix weird small text p paragraph content after double images
- Fix Opengraph/twitter meta cards don't work with SPA 
- Weird offset in photo page list
- Fix social icons missing from medium width

## REFACTOR
- Unify all db data to have same page items (articles, projects, pages all have BREF, TITL, META etc)
- Treat all projects, articles, photos? the same (same 'article' HTML and content requirements)
- Build database tree Home.pages[0].subPages[0]
- TITL not needed? Set homepage name in CONFIG.

## BUGS
- BUG: exactly 1280px width screen causes weird sidebar indent. not 1279 with down or 1281 up, exactly 1280 only.

## Next release
- add meta titles to pages based on page title
- add /now page 

## Images needed
- tools i use (needs image)
- first sail (needs image)
- crusifix (needs final image)
- soul food (needs images)

## Post formatting
- Sailing projects page
- van??
- swordy ea release
- migw and pax 14

## Post complete
- messenger article
- plastic ocean

## Post write
- gibbs farm
- Swordy project page
- why crypto
- why privacy
- why home
- time
- crystal
- change minds
- game tourism
- hobbiton
- dots
- vegetables
- VR 2
- van insulation
- flow

## Missing projects
- Flower
- Him

## To do improvements
- Add "related posts", pick one the viewer hasn't seen yet (history)
- Sort projects by date or importance
- Put type icons on links
- Add BREF or TISA to article cards to hint more about article content
- simplify build script, maybe index can store list of pages (js version and html version) instead of build script needing to calc.
- refactor out duplication in index.js
- format post link names nicer (sailing proj page)
- handle super wide resolution
- handle inline *bold*
- Credit photographer tag on images
- Paralax on header image?

## To do features
- Add image alt text
- Add identity page https://wiki.xxiivv.com/site/identity.html
- Add rss support
- Add lightbox for images
- Add tags to item cards
- Add filtering by tags
- Add new photos
- Add sketches
- Add source image compression on build


## The ultimate system
- csv instead of indental
- markdown instead of runelike