// let puppeteer = require("puppeteer");
// let { installMouseHelper } = require("./install-mouse-helper");

// test("sanity check", () => {
//   expect(true).toBe(true);
// });

// describe("crop testing", () => {
//   let browser;
//   let page;
//   let elementHandle;
//   let crop_btn;
//   let save_btn;
//   let zoom_slider;
//   let download_btn;
//   let reset_btn;
//   let clear_btn;
//   let aspectRatio_ddl;
//   let dyn_width;
//   let dyn_height;

//   beforeAll(async () => {
//     browser = await puppeteer.launch({
//       headless: false,
//       slowMo: 80,
//     });

//     page = await browser.newPage();
//     await installMouseHelper(page);
//     await page.goto("http://127.0.0.1:5500/index.html"); //must be running LiveServer for domain to work

//     elementHandle = await page.$(">>> input[type=file]");
//     await elementHandle.uploadFile(
//       "C:\\Users\\Szymon\\Downloads\\base pics\\gow.png"
//     );

//     crop_btn = await page.$(">>> #crop_btn");
//     save_btn = await page.$(">>> #save_crop");
//     zoom_slider = await page.$(">>> #zoom_slider");
//     download_btn = await page.$(">>> #download_btn");
//     reset_btn = await page.$(">>> #resImg_button");
//     clear_btn = await page.$(">>> #clear_button");
//     aspectRatio_ddl = await page.$(">>> #aspectRatio_ddl");
//     dyn_width = await page.$(">>> #dyn_width");
//     dyn_height = await page.$(">>> #dyn_height");
//   }, 30000);

//   describe("crop testing 1", () => {
//     test("right & bottom border crop", async () => {
//       await crop_btn.click();
//       await page.mouse.move(500, 329);
//       await page.mouse.down();
//       await page.mouse.move(459, 243);
//       await page.mouse.up();
//       await save_btn.click();
//     }, 30000);

//     test("scale image up and check for accurate reporting on dimensions of cropping div in dynamic_dims", async () => {
//       //scale
//       await page.mouse.move(557, 447);
//       await page.mouse.down();
//       await page.mouse.up();

//       expect(await dyn_width.evaluate((el) => parseInt(el.textContent))).toBe(
//         403
//       );
//       expect(await dyn_height.evaluate((el) => parseInt(el.textContent))).toBe(
//         171
//       );
//     }, 30000);

//     test("top left crop, drag and drop cropping div, and download", async () => {
//       await crop_btn.click();
//       await page.mouse.move(161, 152);
//       await page.mouse.down();
//       await page.mouse.move(296, 262);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       //drag and drop cropping div
//       await page.mouse.move(426, 290);
//       await page.mouse.down();
//       await page.mouse.move(426, 180);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       await save_btn.click();

//       //download
//       await download_btn.click();

//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }, 30000);

//     test("reset", async () => {
//       await reset_btn.click();
//     });
//   });

//   describe("crop testing 2", () => {
//     test("double booked left border crop", async () => {
//       await crop_btn.click();
//       await page.mouse.move(216, 235);
//       await page.mouse.down();
//       await page.mouse.move(247, 235);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       await page.mouse.move(247, 235);
//       await page.mouse.down();
//       await page.mouse.move(297, 235);
//       await page.mouse.up();
//       await save_btn.click();
//     }, 30000);

//     test("scale image up", async () => {
//       await page.mouse.move(548, 447);
//       await page.mouse.down();
//       await page.mouse.up();
//     }, 30000);

//     test("modify aspect ratio", async () => {
//       await aspectRatio_ddl.select("16:9");
//     }, 30000);

//     test("bottom right border crop and download", async () => {
//       await crop_btn.click();

//       await page.mouse.move(505, 311);
//       await page.mouse.down();
//       await page.mouse.move(382, 214);
//       await page.mouse.up();
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       await save_btn.click();

//       //download
//       await download_btn.click();

//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }, 30000);
//     test("reset", async () => {
//       await reset_btn.click();
//     });
//   });

//   describe("crop testing 3", () => {
//     test("scale image down", async () => {
//       //scale
//       await page.mouse.move(502, 447);
//       await page.mouse.down();
//       await page.mouse.up();
//     }, 30000);

//     test("modify aspect ratio", async () => {
//       await aspectRatio_ddl.select("1:1");
//     }, 30000);

//     test("check dynamic_dims report then top left border crop", async () => {
//       await crop_btn.click();

//       expect(await dyn_width.evaluate((el) => parseInt(el.textContent))).toBe(
//         190
//       );
//       expect(await dyn_height.evaluate((el) => parseInt(el.textContent))).toBe(
//         190
//       );

//       await page.mouse.move(267, 143);
//       await page.mouse.down();
//       await page.mouse.move(317, 170);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       await save_btn.click();
//     }, 30000);

//     test("scale image up", async () => {
//       //scale
//       await page.mouse.move(548, 447);
//       await page.mouse.down();
//       await page.mouse.up();
//     }, 30000);

//     test("clear aspect ratio", async () => {
//       await clear_btn.click();
//     }, 30000);

//     test("bottom right border crop", async () => {
//       await crop_btn.click();

//       await page.mouse.move(503, 348);
//       await page.mouse.down();
//       await page.mouse.move(396, 261);
//       await page.mouse.up();
//     }, 30000);

//     test("drag and drop, top left crop, then download", async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       //drag and drop
//       await page.mouse.move(323, 234);
//       await page.mouse.down();
//       await page.mouse.move(400, 277);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       //top left crop
//       await page.mouse.move(287, 163);
//       await page.mouse.down();
//       await page.mouse.move(417, 264);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 2000));
//       await save_btn.click();

//       //download
//       await download_btn.click();

//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }, 30000);

//     test("reset", async () => {
//       await reset_btn.click();
//     });
//   });

//   describe("crop testing 4", () => {
//     test("load rots image", async () => {
//       await elementHandle.uploadFile(
//         "C:\\Users\\Szymon\\Downloads\\base pics\\rots.jpg"
//       );
//     }, 30000);

//     test("scale image down", async () => {
//       await page.mouse.move(482, 447);
//       await page.mouse.down();
//       await page.mouse.up();
//     }, 30000);

//     test("crop", async () => {
//       await crop_btn.click();

//       //bottom right crop
//       await page.mouse.move(462, 391);
//       await page.mouse.down();
//       await page.mouse.move(455, 344);
//       await page.mouse.up();

//       //top left crop
//       await page.mouse.move(255, 78);
//       await page.mouse.down();
//       await page.mouse.move(265, 96);
//       await page.mouse.up();

//       await new Promise((resolve) => setTimeout(resolve, 5000));

//       await save_btn.click();

//       //download
//       await download_btn.click();

//       await new Promise((resolve) => setTimeout(resolve, 5000));
//     }, 30000);

//     // test("reset", async () => {
//     //   await reset_btn.click();
//     // });
//   });
// });

test("sanity check", () => {
  expect(true).toBeTruthy();
});
