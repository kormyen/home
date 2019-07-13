'use strict';

const fs = require('fs-extra');
const fsp = require('fs').promises;
const path = require("path");
const vm = require("vm");
const puppeteer = require('puppeteer');

const timeStart = new Date();
const directorySource = path.join(__dirname, `../site`);
const directoryOutput = path.join(__dirname, `../docs`);
const miscPages = ['projects', 'photos'];
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

// Wipe build directory so we start from scratch incase something is removed - no diff!
fs.emptyDirSync(directoryOutput);

// Copy all static files/folders.
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

fs.copyFile(path.join(__dirname, `true-build.js`), path.join(__dirname, `../site/build.js`), (err) => {
  if (err) throw err;
});
fs.copyFile(path.join(__dirname, `CNAME`), path.join(directoryOutput,`CNAME`), (err) => {
  if (err) throw err;
});

async function convertLinksToRoot(html)
{
  html = html.split(`asset/`).join('/asset/');
  html = html.split(`href="media/`).join('href="/media/');
  html = html.split(`src="media/`).join('src="https://media.githubusercontent.com/media/kormyen/home/master/site/media/');
  return html;
}

// Compile html (run then remove JS)
async function doBuild() 
{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Compile index
  let loadPath = `file:${path.join(directorySource, `index.html`)}`;
  await page.goto(loadPath);

  let html = await page.content();
  let htmlSplit = html.split(`<!-- JS -->`);
  
  htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
  await fsp.writeFile(path.join(directoryOutput, `index.html`), htmlSplit[0] + htmlSplit[2], (err) => {  
    if (err) { throw err; }
  });

  for (let m = 0; m < miscPages.length; m++)
  {
    loadPath = `file:${path.join(directorySource, `index.html#${miscPages[m]}`)}`;
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen

    html = await page.content();
    htmlSplit = html.split("<!-- JS -->");

    const dir = `${directoryOutput}/${miscPages[m].toLowerCase()}`;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }

    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
  }

  for (let p = 0; p < projectKeys.length; p++)
  {
    loadPath = `file:${path.join(directorySource, `index.html#project-${projectKeys[p]}`)}`;
    await page.goto(loadPath);
    await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen

    html = await page.content();
    htmlSplit = html.split("<!-- JS -->");

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

    htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
    await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
  }

  for (let pa = 0; pa < pagesKeys.length; pa++)
  {
    if (pagesKeys[pa] != 'INDEX')
    {
      loadPath = `file:${path.join(directorySource, `index.html#${pagesKeys[pa].toLowerCase()}`)}`;
      await page.goto(loadPath);
      await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen

      html = await page.content();
      htmlSplit = html.split("<!-- JS -->");

      const dir = `${directoryOutput}/${pagesKeys[pa].toLowerCase()}`;
      if (!fs.existsSync(dir))
      {
        fs.mkdirSync(dir);
      }

      htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
      await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
    }
  }

  // Compile lightbox page for every image
  for (let i = 0; i < media.length; i++)
  {
      loadPath = `file:${path.join(directorySource, `lightbox.html#${media[i].date}`)}`;
      await page.goto(loadPath);
      await page.reload(); // this refresh/reload makes url hash read (js image loading) actually happen
    
      html = await page.content();
      htmlSplit = html.split("<!-- JS -->");

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

      htmlSplit[0] = await convertLinksToRoot(htmlSplit[0]);
      await fsp.writeFile(`${dir}/index.html`, htmlSplit[0] + htmlSplit[2])
  }

  await browser.close();
};

(async () => 
{
  await doBuild();
  console.log(`built in ${((new Date() - timeStart) / 1000).toFixed(2)}s`);

  fs.copyFile(path.join(__dirname, `false-build.js`), path.join(__dirname, `../site/build.js`), (err) => {
    if (err) throw err;
  });
})();