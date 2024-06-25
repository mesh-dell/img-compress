const { program } = require("commander");

program
  .name("img-compress")
  .description(
    "CLI application that takes a path as input and compresses all the images in that directory."
  )
  .version("1.0.0");

program
  .command("compress")
  .argument("<path>", "input path to look for images")
  .option("-o, --output", "Output path")
  .action((path, options) => {
    console.log(path, options.output);
  });
