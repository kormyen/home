'use strict';

const fs = require('fs-extra');
const fsp = require('fs').promises;
const path = require("path");
const vm = require("vm");
const puppeteer = require('puppeteer');

const timeStart = new Date();
const directorySource = path.join(__dirname, `../site`);
const directoryOutput = path.join(__dirname, `../public`);
const miscPages = ['projects', 'photos', 'posts'];
const staticFolders = ['asset', 'media'];

// Include Tablatal library in order to read DB
const tbtlScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'logic/lib/tablatal.js')));
tbtlScript.runInThisContext();

// Include media DB
const mediaScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'db/media.tbtl')));
mediaScript.runInThisContext();
const media = new Tablatal(MEDIA).parse();

// Include Indental library in order to read DB
const ndtlScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'logic/lib/indental.js')));
ndtlScript.runInThisContext();

// Include projects DB
const projectsScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'db/projects.ndtl')));
projectsScript.runInThisContext();
const projects = new Indental(PROJECTS).parse();
const projectKeys = Object.keys(projects);

// Include pages DB
const pagesScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'db/pages.ndtl')));
pagesScript.runInThisContext();
const pages = new Indental(PAGES).parse();
const pagesKeys = Object.keys(pages);

// Include posts DB
const postsScript = new vm.Script(fs.readFileSync(path.join(directorySource, 'db/articles.ndtl')));
postsScript.runInThisContext();
const posts = new Indental(ARTICLES).parse();

let postsKeys = [];
const postsKeysAll = Object.keys(posts);
for (let p = 0; p < postsKeysAll.length; p++)
{
  if (posts[postsKeysAll[p]].PUBL == "true")
  {
    postsKeys.push(postsKeysAll[p]);
    console.log(postsKeysAll[p]);
  }
}

// Wipe build directory so we start from scratch incase something is removed - no diff!
fs.emptyDirSync(directoryOutput);

// Copy all static files/folders
staticFolders.forEach(folderName =>
{
  fs.copy(path.join(directorySource, folderName), path.join(directoryOutput, folderName), function (err)
  {
    if (err) 
    {
      console.error(`error copying folderName: ${err}`);
    }
  });
});

// Copy Webring shared files
let webringSource = path.join(directorySource, `db`);
let webringOutput = path.join(directoryOutput, `db`);
if (!fs.existsSync(webringOutput)){
  fs.mkdirSync(webringOutput);
}
fs.copyFile(path.join(webringSource, `glossary.ndtl`), path.join(webringOutput, `glossary.ndtl`), (err) => {
  if (err) throw err;
});
fs.copyFile(path.join(directorySource, `twtxt.txt`), path.join(directoryOutput, `twtxt.txt`), (err) => {
  if (err) throw err;
});

// Copy file that declares 'BUILD = true' in webapp which is used by inline.js to change how internal links work (not hash linking for webapp but root-relative url changes)
fs.copyFile(path.join(__dirname, `true-build.js`), path.join(__dirname, `../site/build.js`), (err) => {
  if (err) throw err;
});

async function convertLinksToRoot(html)
{
  // Convert media and asset look up hyperlinks to root-relative. Relative stepping back directories is possible... but annoying to setup and I don't need it
  html = html.split(`asset/`).join('/asset/');
  html = html.split(`href="media/`).join('href="/media/');
  html = html.split(`src="media/`).join('src="/media/');
  return html;
}

// Compile html (run then remove JS)
async function doBuild() 
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // COMPILE INDEX
  // Load
  let loadPath = `file:${path.join(directorySource, `index.html`)}`;
  await page.goto(loadPath);
  let html = await page.content();

  // Remove JS and save
  let htmlSplit = html.split(`<!-- JS -->`);
  htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
  await fsp.writeFile(path.join(directoryOutput, `index.html`), htmlSplit[0] + htmlSplit[2], (err) => {  
    if (err) { throw err; }
  });

  // PROJECT LIST, PHOTO LIST, POST LIST
  for (let m = 0; m < miscPages.length; m++)
  {
    // Create directories
    const dir = `${directoryOutput}/${miscPages[m].toLowerCase()}`;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }

    // Load
    loadPath = `file:${path.join(directorySource, `index.html#${miscPages[m]}`)}`;
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
    html = await page.content();
    
    // Remove JS and save
    htmlSplit = html.split("<!-- JS -->");
    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
  }

  // PROJECT PAGES
  for (let p = 0; p < projectKeys.length; p++)
  {
    // Create directories
    const dirProj = `${directoryOutput}/projects`;
    if (!fs.existsSync(dirProj))
    {
      fs.mkdirSync(dirProj);
    }
    const dir = `${dirProj}/${projectKeys[p].toLowerCase()}`;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }

    // Load
    loadPath = `file:${path.join(directorySource, `index.html#project-${projectKeys[p]}`)}`;
    console.log(loadPath);
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
    html = await page.content();

    // Remove JS and save
    htmlSplit = html.split("<!-- JS -->");
    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2]);
  }

  // POST PAGES
  for (let p = 0; p < postsKeys.length; p++)
  {
    // Create directories
    const dirPosts = `${directoryOutput}/posts`;
    if (!fs.existsSync(dirPosts))
    {
      fs.mkdirSync(dirPosts);
    }

    let postId = postsKeys[p].toLowerCase().replace(/ /g,`-`);
    
    const dir = `${dirPosts}/${postId}`;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }

    // Load
    loadPath = `file:${path.join(directorySource, `index.html#post-${postId}`)}`;
    console.log(loadPath);
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
    html = await page.content();

    // Remove JS and save
    htmlSplit = html.split("<!-- JS -->");
    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2]);
  }

  // OTHER PAGES (LOG, ABOUT)
  for (let pa = 0; pa < pagesKeys.length; pa++)
  {
    if (pagesKeys[pa] != 'INDEX')
    {
      // Create directories
      const dir = `${directoryOutput}/${pagesKeys[pa].toLowerCase()}`;
      if (!fs.existsSync(dir))
      {
        fs.mkdirSync(dir);
      }

      // Load
      loadPath = `file:${path.join(directorySource, `index.html#${pagesKeys[pa].toLowerCase()}`)}`;
      await page.goto(loadPath);
      await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
      html = await page.content();

      // Remove JS and save
      htmlSplit = html.split("<!-- JS -->");
      htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
      await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2]);
    }
  }

  // COMPILE LIGHTBOX FOR EVERY IMAGE
  for (let i = 0; i < media.length; i++)
  {
    // Create directories
    const dirProj = `${directoryOutput}/media`;
    if (!fs.existsSync(dirProj))
    {
      fs.mkdirSync(dirProj);
    }
    const dir = `${directoryOutput}/media/${media[i].date}`;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }

    // Load
    loadPath = `file:${path.join(directorySource, `lightbox.html#${media[i].date}`)}`;
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
    html = await page.content();

    // Remove JS and save
    htmlSplit = html.split("<!-- JS -->");
    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
  }

  await browser.close();
};

// RUN BUILD!
(async () => 
{
  await doBuild();
  console.log(`built in ${((new Date() - timeStart) / 1000).toFixed(2)}s`);

  // Copy file that declares 'BUILD = false' in webapp which is used by inline.js to change how internal links work (change back to hash linking for webapp)
  fs.copyFile(path.join(__dirname, `false-build.js`), path.join(__dirname, `../site/build.js`), (err) => {
    if (err) throw err;
  });
})();