<img src='https://media.githubusercontent.com/media/kormyen/home/master/site/media/2019-07-09_21-13.jpg'/>

[**Live web version here**](http://kor.nz)

# Home

Home is a portfolio, time tracker and exocortex.

No-JS by JS from JS - a no-JS static html/css website compiled by a nodejs server from a single-page JS webapp.

Current benefits (compared to a static single-page client-side webapp)
- Fully indexable by search engines
- Faster initial load
- Database can be private
- Run anywhere with no trust required (no-JS)

This setup would allow for a simple private nodejs frontend to do database additions and modifications then auto-rebuild the static public website.

## Structure

- `server` folder is the nodejs server.
- `site` folder is the JS webapp (source).
- `docs` folder is the no-JS website (output). Using the folder name `docs` in order to work with Github Pages hosting restrictions.

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

**Run**
```
open home/docs/index.html
```

## Dependencies

- The human-readable data structures [Indental](https://wiki.xxiivv.com/#indental) and [Tablatal](https://wiki.xxiivv.com/#tablatal) created by [Neauoire](http://wiki.xxiivv.com).
- Headless Chrome Node API [Puppeteer](https://pptr.dev) for server side rendering.
- [fs-extra](https://www.npmjs.com/package/fs-extra) for 'emptyDirSync'. I'd like to remove this.

## Inspirations

- [Neauoire](https://wiki.xxiivv.com/#home) - 'digital nomad.'
- [Webring](http://webring.xxiivv.com) - 'artist and developers self built diaries, wikis & portfolios.'
- [Time travelers](https://github.com/merveilles/Time-Travelers) - 'self-authored time tracking tools.'
- [Merveilles](https://merveilles.town) - 'collective of artists.'