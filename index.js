const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fileSystem = require("fs");

const SONG_CONTENT_ID = "#music_text";
const SONG_BLOCK_CLASS = ".blocks";
const BLOCK_TEXT_CLASS = "text";
const BLOCK_CHORDS_CLASS = "chopds"; // wtf?
const BLOCK_TITLE_CLASS = "videlit_line";

async function runParser() {

    const page = await getBrowserLikeHtml("https://holychords.pro/38733");
    let stringWithResults = "";
    const $ = cheerio.load(page);

    function processBlock($block) {
        $block.contents().each((index, row) => {
            const $row = $(row);
            if ($row.hasClass(BLOCK_CHORDS_CLASS) && !$row.contents().length) {
                stringWithResults += `\n`;
            }
            //  handle the Title
            if ($row.hasClass(BLOCK_TITLE_CLASS)) {
                stringWithResults += `### ${$row.text().trim()} \n`;
            }
            //  handle the Chords
            if ($row.hasClass(BLOCK_CHORDS_CLASS) && $row.contents().length) {
                stringWithResults += `**${$row.text().trim()}**  \n`
            }
            //  handle the Text
            if ($row.hasClass(BLOCK_TEXT_CLASS)) {
                stringWithResults += `${$row.text().trim()}  ${String.fromCharCode(10)}`
            }
        })
    
    
    
    
    
    
        // handle the Title
    
        // const title = $block.find("b");
        // if (title) {
        //     stringWithResults += `###${title.text()}\n`;
        // }
    
        //  handle the Chords
    }

    const $songContent = $(SONG_CONTENT_ID);

    const $blocks = $songContent.find(SONG_BLOCK_CLASS);

    console.log("blocks_length: ", $blocks.length);

    $blocks.each((index, blockElement) => {
        processBlock($(blockElement));
    });


    const filePath = "song.md";
    fileSystem.writeFileSync(filePath, stringWithResults);

}

async function getBrowserLikeHtml(url) {
    // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: "new"
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the website
  await page.goto(url); // Replace with the URL of the website you want to scrape

  // Wait for some time or for specific elements to load or execute JavaScript
  // For example, you can wait for a specific element to appear:
  // await page.waitForSelector('your-selector');

  // Get the HTML of the page after JavaScript has executed
  const html = await page.content();

  // Close the browser
  await browser.close();

  return html;
}

runParser();
