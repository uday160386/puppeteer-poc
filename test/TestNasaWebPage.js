const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //setting page size
  await page.setViewport({
    width: 1000,
    height: 1000,
    deviceScaleFactor: 1,
  });

  await page.goto('https://www.nasa.gov', {waitUntil: 'networkidle2'});
 
  //Implict wait
  await page.waitFor(1000);
  // wait for predicate
  await page.waitFor(() => !!document.querySelector('#ember902'));
  
  const elementHandle = await page.$('#ember902');
  await elementHandle.type('boeing');
  await elementHandle.press('Enter');
  await page.screenshot({path: './pdfreports/nasa_home.png'});
  await page.emulateMedia('screen');
  await page.pdf({path: './pdfreports/nasa_home_page.pdf', format: 'A4'});

  await browser.close();
})();
