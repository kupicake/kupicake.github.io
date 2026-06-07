import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://pixabay.com/vectors/dragonfly-abstract-art-design-10302152/');
    const imgObj = await page.evaluate(() => {
       const meta = document.querySelector('meta[property="og:image"]');
       return meta ? meta.content : null;
    });
    console.log("FOUND:", imgObj);
    await browser.close();
  } catch(e) {
    console.error(e);
  }
})();
