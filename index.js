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
  .action((path, options) => {
    console.log(path, options.output);

    // try to open all files in the path
    try {
      getImages(path);
    } catch (err) {
      console.error(err);
    }
  });

program.parse();

async function getImages(path) {
  try {
    const dir = await opendir(path);
    for await (const dirent of dir) console.log(dirent.name);
  } catch (err) {
    console.error(err);
  }
}
