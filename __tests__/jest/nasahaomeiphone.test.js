
const puppeteer = require('puppeteer');

const timeout = 30000;
describe('Nasa Website', () => {
  it('Puppeteer test with jest', async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const iPhone = puppeteer.devices['iPhone X'];
    //Devices supported lis:"https://github.com/puppeteer/puppeteer/blob/aa246973b96c36768bf3d4db0383f7101a1b4ee9/lib/DeviceDescriptors.js"

    await page.emulate(iPhone);
    await page.goto('https://www.nasa.gov', { waitUntil: 'networkidle2' });
    //Implict wait
    await page.waitFor(1000);
    // wait for predicate
    await page.waitFor(() => !!document.querySelector('#ember902'));

    const elementHandle = await page.$('#ember902');
    await elementHandle.type('boeing');
    await elementHandle.press('Enter');
    await page.screenshot({ path: './pdfreports/mobile/X/nasa_home.png' });
    await page.emulateMedia('screen');
    await page.pdf({ path: './pdfreports/mobile/X/nasa_home_page.pdf', format: 'A4' });

    await browser.close();
  }, timeout);
}, timeout);
