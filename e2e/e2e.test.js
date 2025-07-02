import puppetteer from "puppeteer";
import { fork } from "child_process";

describe("test validator form", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    try {
      server = fork(`${__dirname}/e2e.server.js`);
      await new Promise((resolve, reject) => {
        server.on("error", reject);
        server.on("message", (message) => {
          if (message === "ok") {
            resolve();
          }
        });
      });
      
      browser = await puppetteer.launch({
        slowMo: 100,
        args: ["--no-sandbox"],
        devtools: true, 
      });
      
      page = await browser.newPage();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, 40000);

  test("Visa", async () => {
    await page.goto(baseUrl);
  
    
    const input = await page.$("#cart-input");
    await input.type("4539283476916568");
  
    // Нажимаем кнопку отправки
    const submit = await page.$("#card_submit");

    page.once('dialog', async dialog => {
      console.log(`Alert message: ${dialog.message()}`);
      await dialog.accept(); // Принимаем алерт
    });

    await submit.click();

   
  
    
    await page.waitForSelector(".card_item.card_visa");
  
    // Проверяем, что у элемента НЕТ других классов
    const elementWithClasses = await page.evaluate(() => {
      const visaElement = document.querySelector(".card_item.card_visa");
      return Array.from(visaElement.classList); // получаем массив классов элемента
    });
  
    expect(elementWithClasses).toEqual(["card_item", "card_visa"]);
  }, 40000);


  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });
});