const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fileSystem = require("fs");

const SONG_CONTENT_ID = "#music_text";
const SONG_BLOCK_CLASS = ".blocks";
const BLOCK_TEXT_CLASS = "text";
const BLOCK_CHORDS_CLASS = "chopds"; // wtf?
const BLOCK_TITLE_CLASS = "videlit_line";

enum ItemType {
  CHORD = "chord",
  TEXT = "text",
  HINT = "hint",
  EMPTY = "empty",
}

type Item = {
  type?: ItemType;
  content?: Array<string | Item>;
};

type Block = {
  title?: string;
  content?: Array<Item>;
};

type Song = {
  name?: string;
  content?: Array<Block>;
};

async function getParsedSong(url) {
  const $ = await getSelector(url);

  const $songContent = $(SONG_CONTENT_ID);
  const $blocks = $songContent.find(SONG_BLOCK_CLASS);

  const song: Song = getSong();

  function getBlock($block): Block {
    const block: Block = {
      content: [],
    };

    $block.contents().each((index, row) => {
      const $row = $(row);
      //  handle the Title
      if ($row.hasClass(BLOCK_TITLE_CLASS)) {
        block.title = $row.text().trim();
      }
      //  handle the Chords
      if ($row.hasClass(BLOCK_CHORDS_CLASS) && $row.contents().length) {
        block.content.push({
          type: ItemType.CHORD,
          content: $row.text().trim(),
        });
      }
      //  handle the Text
      if ($row.hasClass(BLOCK_TEXT_CLASS)) {
        block.content.push({
          type: ItemType.TEXT,
          content: $row.text().trim(),
        });
      }
      // handle empty line
      if ($row.hasClass(BLOCK_CHORDS_CLASS) && !$row.contents().length) {
        block.content.push({
          type: ItemType.EMPTY,
          content: [],
        });
      }
    });

    return block;
  }

  function getSong(): Song {
    const song: Song = {
      name: "no name",
      content: [],
    };

    $blocks.each((index, blockElement) => {
      const block: Block = getBlock($(blockElement));
      song.content.push(block);
    });

    return song;
  }

  const songString: string = JSON.stringify(song);

  const filePath = "song.json";
  fileSystem.writeFileSync(filePath, songString);
}

async function getSelector(url) {
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: "new",
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

  return cheerio.load(html);
}

getParsedSong("https://holychords.pro/38733");

const exampleObj = {
  name: "Song name",
  bpm: 123,
  content: [
    {
      title: "Verse 1",
      content: [
        {
          type: "chords",
          content: ["G    Em"],
        },
        {
          type: "text",
          content: [
            "Ла ла ла ла ла",
            {
              type: "hint",
              color: "red",
              text: "Тут вступає другий голос",
            },
            "Нана на на на",
          ],
        },
      ],
    },
    {
      title: "Chorus",
      content: [{}],
    },
  ],
};
