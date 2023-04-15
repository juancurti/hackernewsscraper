const puppeteer = require('puppeteer');

const scrapeHackerNews = async() => {
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

// Navigate to Hacker News
  await page.goto('https://news.ycombinator.com/');
// Extract news information
  const news = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('.titleline > a'));
    const scores = Array.from(document.querySelectorAll('.score'));
    const links = Array.from(document.querySelectorAll('.titleline > a'));
    return titles.map((title, index) => ({
      title: title.innerText,
      score: scores[index] ? parseInt(scores[index].innerText) : 0,
      link: links[index].href,
    }));
  });
  // Close the browser instance
  await browser.close();
  // Return the scraped news
  return news;
}

scrapeHackerNews().then(news => {
  console.log('Hacker News:');
  news.forEach((item, index) => {
    console.log((index+1)+". "+item.title+" "+item.score+" points");
    console.log("Link: "+item.link);
    console.log('----------------------------------');
  });
});