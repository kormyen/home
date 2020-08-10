<img src='https://media.githubusercontent.com/media/kormyen/home/master/site/media/2019-07-09_21-13.jpg'/>

[**Live web version here**](https://kor.nz)

# Home
Home is a portfolio, time tracker and exocortex.
- No-JS by JS from JS
- (No-JS static html/css website compiled by a nodejs server from a single-page JS webapp)

Static page generation is done with puppeteer headless chrome.

Current benefits (compared to a static single-page client-side webapp)
- Fully indexable by search engines
- Faster initial load
- Database can be private
- Run anywhere with no trust required (no-JS)

This setup would allow for a simple private nodejs frontend to do database additions and modifications then auto-rebuild the static public website.

## To do release
- fix post page misc text on medium and small width
- add posts to footer
- make footer into flex display to handle small screen
- order by time posts in /posts
- format post link names properly (sailing proj page)

## Post formatting
- gamelab notes
- soul food
- humane calm
- messenger article
- van??
- swordy Ea release
- migw and pax 14
- tools i use (needs image)
- first sail (needs image)
- crusifix (needs final image)

## Post writing
- Swordy project page
- why crypto
- why privacy
- why home
- time
- crystal
- change minds
- plastic ocean
- gibbs farm
- game tourism
- hobbiton
- dots
- vegetables
- VR 2
- van insulation
- flow

## To do next
- handle super wide resolution
- handle inline *bold*
- Add source image compression on build
- Credit photographer tag on images
- Add lightbox for images
- Add tags to item cards
- Add filtering by tags
- Add new photos
- Add sketches

## Structure
- `server` folder is the build script.
- `site` folder is the JS webapp (source).
- `public` folder will be created after building and will contain the static website.

## Dev

**Install**
```
git clone git@github.com:kormyen/home.git
cd home/server
npm install
```

**Test**
```
open home/site/index.html in a browser
```

**Build**
```
node home/server/build.js
```

**Publish**
```
vercel --prod
```

## Dependencies
- The human-readable data structures [Indental](https://wiki.xxiivv.com/#indental) and [Tablatal](https://wiki.xxiivv.com/#tablatal) created by [Neauoire](http://wiki.xxiivv.com).
- Headless Chrome Node API [Puppeteer](https://pptr.dev) for server side rendering.
- [fs-extra](https://www.npmjs.com/package/fs-extra) for 'emptyDirSync'.
- [vercel](https://vercel.com/download) for server hosting management.

## Inspirations
- [Neauoire](https://wiki.xxiivv.com/#home) - 'digital nomad.'
- [Webring](http://webring.xxiivv.com) - 'artist and developers self built diaries, wikis & portfolios.'
- [Time travelers](https://github.com/merveilles/Time-Travelers) - 'self-authored time tracking tools.'
- [Merveilles](https://merveilles.town) - 'collective of artists.'