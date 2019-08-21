'use strict';

function Focus()
{
  this.log;
  this.projects;
  this.media;
  this.content;

  this.install = function(log, projects, media)
  {
    this.log = log;
    this.projects = projects;
    this.media = media;
  }

  this.start = function()
  {
    // Limit to recent logs
    let recentLogs = [];
    // let refDate = new Date;
    // refDate.setDate(refDate.getDate()-120);
    // let refDateString = refDate.getTime();


    let logs = this.log.external;

    let index = 0;
    while(index < logs.length)
    {
      // if (logs[index].dateObj.getTime() > refDateString)
      // {
        recentLogs.push(this.log.external[index]);
      // }
      index++;
    }

    // Group recent logs by project
    let projs = this.log.groupBy(recentLogs, entry => entry.proj);

    // Calculate total hours per project
    let hourTotals = [];
    projs.forEach(category => 
      {
        let count = 0;
        category.forEach(log => 
          {
            count += log.hour;
          }
        );
        hourTotals.push({ proj: category[0].proj, hours: count });
      }
    );
    
    hourTotals.sort((a, b) => b.hours - a.hours);

    // Get extras
    for (let i = 0; i < hourTotals.length; i++)
    {
      // Get description, tags etc
      hourTotals[i].info = this.projects.get(hourTotals[i].proj);
    }

    var validDb = hourTotals.filter(function (el)
    {
      return el.info != undefined;
    });

    // Build HTML
    this.content = ``;
    for (let i = 0; i < Math.min(validDb.length, 3); i++)
    {
      this.content += validDb[i].info.HtmlArticle();
    }
  }

  this.display = function(container)
  {
    container.innerHTML = this.content;
  }
}