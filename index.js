import fetch from "node-fetch";
import puppeteer from "puppeteer";
import fs from "fs";

async function codejam() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let year = 2008; year <= 2022; year++) {
    const link =
      "https://codingcompetitions.withgoogle.com/codejam/archive/" +
      year.toString();

    await page.goto(link);

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector(
      ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile"
    );

    let s = await page.$$eval(
      ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile",
      (e) => e.map((el) => el.pathname)
    );

    let n = await page.$$eval(".schedule-row-cell > span", (e) =>
      e.map((el) => el.innerText)
    );

    let i = 1;

    s.forEach(async (e) => {
      const slug = e.split("/")[3];

      fs.mkdirSync(
        `./codejam/${year.toString()}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );

      var writeStream = fs.createWriteStream(
        `./codejam/${year.toString()}/${n[i++]}.json`
      );

      await fetch(`https://codejam.googleapis.com/dashboard/${slug}/poll?p=e30`)
        .then((response) => response.text())
        .then((data) => {
          writeStream.write(Buffer.from(data, "base64"));
        });
      writeStream.end();

      // download test cases
      const p = await browser.newPage();

      // goto codejam's round page
      await p.goto(
        `https://codingcompetitions.withgoogle.com/codejam/round/${slug}`
      );

      // wait for open problem link to appear
      await p.waitForSelector("a.problems-nav-problem-link");

      let problems = await page.$$eval(
        ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile",
        (e) => e.map((el) => el.pathname)
      );

      let promises = problems.map(async (problem) => {
        const problemPage = await browser.newPage();
        // await problemPage
      });

      // click on Open problem
      await p.click("a.problems-nav-problem-link");

      // test cases are available if class i.material-icons.grey is present
      // Case 1: test cases are present
    });
  }
  await browser.close();
}

async function kickstart() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let year = 2013; year <= 2022; year++) {
    const link =
      "https://codingcompetitions.withgoogle.com/kickstart/archive/" +
      year.toString();

    await page.goto(link);

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector(
      ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile"
    );

    let s = await page.$$eval(
      ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile",
      (e) => e.map((el) => el.pathname)
    );

    let n = await page.$$eval(".schedule-row-cell > span", (e) =>
      e.map((el) => el.innerText)
    );

    let i = 1;

    s.forEach(async (e) => {
      const slug = e.split("/")[3];

      fs.mkdirSync(
        `./kickstart/${year.toString()}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );

      var writeStream = fs.createWriteStream(
        `./kickstart/${year.toString()}/${n[i++]}.json`
      );
      await fetch(`https://codejam.googleapis.com/dashboard/${slug}/poll?p=e30`)
        .then((response) => response.text())
        .then((data) => {
          writeStream.write(Buffer.from(data, "base64"));
        });
      writeStream.end();
    });
  }
  await browser.close();
}

async function codejamio() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const link = "https://codingcompetitions.withgoogle.com/codejamio/archive/";

  await page.goto(link);

  await page.setViewport({ width: 1080, height: 1024 });

  await page.waitForSelector(".mdc-layout-grid__cell--span-4-tablet > a");

  let s = await page.$$eval(".mdc-layout-grid__cell--span-4-tablet > a", (e) =>
    e.map((el) => el.pathname)
  );

  // let n = await page.$$eval(
  //   ".mdc-layout-grid__cell--span-4-tablet > a > div > div.card-body > div:nth-child(1) > p:nth-child(1)",
  //   (e) => e.map((el) => el.innerText)
  // );

  let year = 2022;

  s.forEach(async (e) => {
    const slug = e.split("/")[3];

    fs.mkdirSync(`./codejamio`, { recursive: true }, (err) => {
      if (err) throw err;
    });

    const writeStream = fs.createWriteStream(`./codejamio/${year}.json`);
    year--;
    await fetch(`https://codejam.googleapis.com/dashboard/${slug}/poll?p=e30`)
      .then((response) => response.text())
      .then((data) => {
        writeStream.write(Buffer.from(data, "base64"));
      });
    writeStream.end();
  });

  await browser.close();
}

const downloadFile = async (url, path) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to download file: ${response.status} ${response.statusText}`
    );
  }
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    response.body.pipe(fileStream).on("finish", resolve).on("error", reject);
  });
};

async function hashcode() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (let year = 2014; year <= 2022; year++) {
    let s, n;
    if (year == 2014) {
      s = ["/hashcode/round/0000000000c617e8"];
      n = ["", "Final Round"];
    } else {
      const link =
        "https://codingcompetitions.withgoogle.com/hashcode/archive/" +
        year.toString();

      await page.goto(link);

      await page.setViewport({ width: 1080, height: 1024 });

      await page.waitForSelector(
        ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile"
      );

      s = await page.$$eval(
        ".schedule-row-action.schedule-row-action__push.schedule-row-action__mobile",
        (e) => e.map((el) => el.pathname)
      );

      n = await page.$$eval(".schedule-row-cell > span", (e) =>
        e.map((el) => el.innerText)
      );
    }

    let i = 1;

    for (const idx in s) {
      const e = s[idx];
      const slug = e.split("/")[3];

      const p = await browser.newPage();

      // goto hashcode's round page
      await p.goto(
        `https://codingcompetitions.withgoogle.com/hashcode/round/${slug}`
      );

      // wait for open problem link to appear
      await p.waitForSelector("a.problems-nav-problem-link");

      // click on Open problem
      await p.click("a.problems-nav-problem-link");

      fs.mkdirSync(
        `./hashcode/${year.toString()}/${n[i]}`,
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );

      if (year >= 2021) {
        // download datasets only since problem is already present in json
        await p.waitForSelector(".test-data-download-content");

        const dataSets = await p.$eval(
          ".test-data-download-content",
          (e) => e.children[0].href
        );

        await p.close();

        downloadFile(
          dataSets,
          `./hashcode/${year.toString()}/${n[i]}/Data Sets.zip`
        );

        // fetch json
        const writeStream = fs.createWriteStream(
          `./hashcode/${year.toString()}/${n[i]}/${n[i]}.json`
        );

        await fetch(
          `https://codejam.googleapis.com/dashboard/${slug}/poll?p=e30`
        )
          .then((response) => response.text())
          .then((data) => {
            writeStream.write(Buffer.from(data, "base64"));
          });
        writeStream.end();
      } else {
        // wait for Problem Statement link to appear
        await p.waitForSelector("p > ul > li > a");

        const problemStatement = await p.$eval(
          "p > ul",
          (e) => e.children[0].children[0].href
        );

        const dataSets = await p.$eval(
          "p > ul",
          (e) => e.children[1].children[0].href
        );

        await p.close();

        downloadFile(
          problemStatement,
          `./hashcode/${year.toString()}/${n[i]}/Problem Statement.pdf`
        );
        downloadFile(
          dataSets,
          `./hashcode/${year.toString()}/${n[i]}/Data Sets.zip`
        );
      }
      i++;
    }
  }
  await browser.close();
}

codejam();
kickstart();
hashcode();
codejamio();
