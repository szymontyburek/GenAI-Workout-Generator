let puppeteer = require("puppeteer");
// let { installMouseHelper } = require("./install-mouse-helper");

describe("Image Generator UI/UX testing", () => {
  let browser;
  let page;
  let elementHandle;
  let crop_btn;
  let save_btn;
  let zoom_slider;
  let download_btn;
  let reset_btn;
  let clear_btn;
  let aspectRatio_ddl;
  let dyn_width;
  let dyn_height;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
    });

    page = await browser.newPage();
    await installMouseHelper(page);
    await page.goto("http://localhost:3000");
  }, 30000);

  test("sanity check", () => {
    expect(true).toBeTruthy();
  });
});
