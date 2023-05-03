'use strict';

function Log()
{
  this.external = [];
  this.inline = null;
  this.viz = null;
  this.lastestDate = null;
  this.weekVizData = [];
  this.sectorNames = ["misc", "physical", "electronics", "code", "design", "audio", "carpentry", "research", "boat"];

  this.projects = {};

  this.install = function(data, inline)
  {
    let db = new Tablatal(data).parse();
    for (var i = 0; i < db.length; i++)
    {
      this.external[i] = new LogEntry(db[i]);
    }
    this.inline = inline;
    this.lastestDate = new Date(this.external[0].date);
    this.external.reverse();
    this.viz = new Viz();

    // PER PROJECT
    let projLogs = this.groupBy(this.external, entry => entry.proj);

    for (let [projName, LogEntries] of projLogs)
    {
      if (!this.projects[projName])
      {
        this.projects[projName] = {};
        this.projects[projName].name = projName;
        this.projects[projName].sectors = {};
      }

      let hoursTotal = 0;
      for (let i = 0; i < LogEntries.length; i++)
      {
        let log = LogEntries[i];
        let thisLogsSector = this.sectorNames[log.sect];
        if (!this.projects[projName].sectors[thisLogsSector])
        {
          this.projects[projName].sectors[thisLogsSector] = 0;
        }
      
        this.projects[projName].sectors[thisLogsSector] += log.hour;
        hoursTotal += log.hour;
      }
      this.projects[projName].dateLast = LogEntries[LogEntries.length-1].dateObj;
      this.projects[projName].dateFirst = LogEntries[0].dateObj;
      this.projects[projName].hoursTotal = hoursTotal;
    }

    // DAY, WEEK
    let dayLogs = this.groupBy(this.external, entry => entry.date);

    let dayCount = 0;
    let weekCount = 0;
    let currentYear = '';

    for (let day of dayLogs)
    {
      dayCount++;

      // HOURS
      let hours = 0;
      for (var i = 0; i < day[1].length; i++)
      {
        hours += day[1][i].hour;
      }
      if (this.weekVizData[weekCount] == null)
      {
        this.weekVizData[weekCount] = {};
      }
      if (isNaN(this.weekVizData[weekCount].hours))
      {
        this.weekVizData[weekCount].hours = 0;
      }

      // MONTH NAME
      let date = new Date(day[0]);
      let shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format;
      let month = shortMonthName(date); // "Jul"
      this.weekVizData[weekCount].hours += hours;
      if (this.weekVizData[weekCount].month == null)
      {
        this.weekVizData[weekCount].month = month;
      }

      let newYear = date.getFullYear();
      if (currentYear != newYear)
      {
        currentYear = newYear;
        this.weekVizData[weekCount].gap = currentYear;
      }
      
      // NEXT WEEK START?
      if (dayCount % 7 == 0)
      {
        weekCount ++;
      }

      this.external.reverse(); // Fix ordering of logs. Maybe can avoid calling reverse all together!
    }

    // FUTURE CAST MEDIAN HOURS
    let calcMedianHours = [];
    for (var i = this.weekVizData.length - 2; i >= 0; i--)
    {
      calcMedianHours[i] = this.weekVizData[i].hours;
    }
    let median = this.median(calcMedianHours);
    if (this.weekVizData[weekCount] == undefined)
    {
      weekCount--;
    }

    this.weekVizData[weekCount].forcast = median - this.weekVizData[weekCount].hours;
  }

  this.display = function()
  {
    return this.viz.barGraph(this.weekVizData, "hours", "weeks");
  }

  this.projPercStats = function()
  {
    // console.log(this.projects);
    // let hourOrderedProj = this.projects.sort((a, b) => b.hoursTotal - a.hoursTotal);
    // console.log(hourOrderedProj);

    let result = ``;
    result += "Hamish has last dedicated time to ";

    // COPIED FROM FOCUS
    // Limit to recent logs
    let recentLogs = [];
    let refDate = new Date;
    refDate.setDate(refDate.getDate()-120);
    let refDateString = refDate.getTime();

    let logs = this.external;

    let index = 0;
    while(index < logs.length)
    {
      if (logs[index].dateObj.getTime() > refDateString)
      {
        recentLogs.push(this.external[index]);
      }
      index++;
    }

    // Group recent logs by project
    let projs = this.groupBy(recentLogs, entry => entry.proj);

    // Calculate total hours per project
    let hourTotals = [];
    let totalHours = 0;
    projs.forEach(category => 
      {
        let count = 0;
        category.forEach(log => 
          {
            count += log.hour;
          }
        );
        hourTotals.push({ proj: category[0].proj, hours: count });
        totalHours += count;
      }
    );
    
    hourTotals.sort((a, b) => b.hours - a.hours);

    let stats = [];

    for (let i = 0; i < Math.min(hourTotals.length, 4); i++)
    {
      const element = hourTotals[i];
      const perc = ((element.hours / totalHours) * 100).toFixed(0);
      const inline = `{link project ${element.proj}}`;

      stats.push(`${this.inline.parse(inline)} (${perc}%)`);
    }
    
    for (let s = 0; s < stats.length; s++)
    {
      const element = stats[s];

      if (s != stats.length-1)
      {
        result += `${element}, `;
      }
      else
      {
        result += `and ${element}.`;
      }
    }

    return result;
  }

  this.sectPercStats = function()
  {
    let result = ``;
    result += "This time was been  ";

    // Limit to recent logs
    let recentLogs = [];
    let refDate = new Date;
    refDate.setDate(refDate.getDate()-120); // Two months ago
    let refDateString = refDate.getTime();

    let logs = this.external;

    let index = 0;
    while(index < logs.length)
    {
      if (logs[index].dateObj.getTime() > refDateString)
      {
        recentLogs.push(this.external[index]);
      }
      index++;
    }

    // Group recent logs by project
    let sects = this.groupBy(recentLogs, entry => entry.sect);

    // Calculate total hours per project
    let hourTotals = [];
    let totalHours = 0;
    sects.forEach(category => 
      {
        let count = 0;
        category.forEach(log => 
          {
            count += log.hour;
          }
        );
        hourTotals.push({ sect: category[0].sect, hours: count });
        totalHours += count;
      }
    );
    
    hourTotals.sort((a, b) => b.hours - a.hours);

    let stats = [];

    for (let i = 0; i < Math.min(hourTotals.length, 4); i++)
    {
      const element = hourTotals[i];
      const perc = ((element.hours / totalHours) * 100).toFixed(0);
      const sector = this.sectorNames[element.sect];
      
      stats.push(`${sector} (${perc}%)`);
    }
    
    for (let s = 0; s < stats.length; s++)
    {
      const element = stats[s];

      if (s != stats.length-1)
      {
        result += `${element}, `;
      }
      else
      {
        result += `and ${element}.`;
      }
    }

    return result;
  }

  this.median = function(numbers)
  {
    var median = 0, numsLen = numbers.length;
    numbers.sort();
 
    if (numsLen % 2 === 0) // Is even
    {
      // average of two middle numbers
      median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
    } 
    else
    { 
      // is odd
      // middle number only
      median = numbers[(numsLen - 1) / 2];
    }
    return median;
  }

  this.mapReverse = function(array, fn)
  {
    return array.reduceRight(function (result, el)
    {
        result.push(fn(el));
        return result;
    }, []);
  }

  this.groupBy = function(list, keyGetter)
  {
    const map = new Map();
    list.forEach((item) => 
    {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection)
        {
            map.set(key, [item]);
        } 
        else
        {
            collection.push(item);
        }
    });
    return map;
  }

  this.getLastUpdateText = function()
  {
    // const SECONDS_IN_DAY = 1000*60*60*24;
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    const NTH = function(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    }
    let result = `Last updated on the ${this.lastestDate.getDate()}${NTH(this.lastestDate)} of ${MONTHS[this.lastestDate.getMonth()]} ${this.lastestDate.getFullYear()}.`;

    // let dayDiff = Math.round((new Date() - this.lastestDate) / SECONDS_IN_DAY);
    // if (dayDiff == 0)
    // {
    //   result += 'today.';
    // }
    // else if (dayDiff == 1)
    // {
    //   result += 'yesterday.';
    // }
    // else if (dayDiff < 0)
    // {
    //   result = 'Updated from the future.';
    // }
    // else 
    // {
    //   result += `${dayDiff} days ago.`;
    // }

    return result;
  }
}