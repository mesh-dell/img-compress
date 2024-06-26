const { program } = require("commander");
const { opendir } = require("node:fs/promises");
const path = require("node:path");

program
  .name("img-compress")
  .description(
    "CLI application that takes a path as input and compresses all the images in that directory."
  )
  .version("1.0.0");

program
  .command("compress")
  .argument("<path>", "input path to look for images")
  .option("-o, --output <string>", "Output path")
  .action((inputPath, options) => {
    console.log(inputPath, options.output);

    // try to open all files in the path
    try {
      getImages(inputPath);
    } catch (err) {
      console.error(err);
    }
  });

program.parse();

const imageExtensions = [
  ".jpeg",
  ".jpg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".tiff",
];

async function getImages(dirPath) {
  try {
    const dir = await opendir(dirPath);
    for await (const dirent of dir) {
      const extension = path.extname(dirent.name).toLowerCase();

      if (imageExtensions.includes(extension)) {
        console.log(`Image found: ${dirent.name}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}
