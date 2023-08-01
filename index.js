import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false }); 
    const page = await browser.newPage();

 
    await page.goto('https://mail.google.com/');

  
    await page.waitForSelector('input[type="email"]');


    await page.type('input[type="email"]', 'your_email@gmail.com');

   
    await page.click('#identifierNext');

 
    await page.waitForSelector('input[type="password"]');

    
    await page.type('input[type="password"]', 'your_password');

    
    await page.click('#passwordNext');

   
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    
    const unreadEmails = await page.evaluate(() => {
      const inboxLabel = document.querySelector('div[aria-label="Вхідні"]');
      return inboxLabel ? inboxLabel.getAttribute('aria-posinset') : 0;
    });

    console.log('Кількість непрочитаних листів:', unreadEmails);

    await browser.close();
  } catch (error) {
    console.error('Помилка:', error);
  }
})();