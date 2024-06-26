const { program } = require("commander");
const { opendir } = require("node:fs/promises");
const fs = require("node:fs/promises");
const sharp = require("sharp");
const path = require("node:path");
const chalk = require("chalk");

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
      getImages(inputPath, options);
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

async function getImages(dirPath, options) {
  try {
    const dir = await opendir(dirPath);
    for await (const dirent of dir) {
      const extension = path.extname(dirent.name).toLowerCase();

      if (imageExtensions.includes(extension)) {
        const inputFilePath = path.join(dirPath, dirent.name);
        const outputPath = options.output || dirPath;
        const outputFilePath = path.join(
          outputPath,
          `${path.basename(dirent.name, extension)}_compressed${extension}`
        );
        await compressImage(inputFilePath, outputFilePath, extension);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function compressImage(inputFilePath, outputFilePath, extension) {
  const image = sharp(inputFilePath);
  switch (extension) {
    case ".jpeg":
    case ".jpg":
      await image.jpeg({ quality: 80, mozjpeg: true }).toFile(outputFilePath);
      break;
    case ".png":
      await image
        .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
        .toFile(outputFilePath);
      break;
    case ".webp":
      await image.webp({ quality: 80 }).toFile(outputFilePath);
      break;
    case ".gif":
      await image.gif({ colors: 128 }).toFile(outputFilePath);
      break;
    case ".avif":
      await image.avif({ quality: 50, effort: 9 }).toFile(outputFilePath);
      break;
    case ".tiff":
      await image
        .tiff({ compression: "lzw", predictor: "horizontal" })
        .toFile(outputFilePath);
      break;
    default:
      throw new Error(`Unsupported image format: ${extension}`);
  }
  const inputStats = await fs.stat(inputPath);
  const inputSize = inputStats.size;
  const outputStats = await fs.stat(outputFilePath);
  const outputSize = outputStats.size;
  const savedBytes = inputSize - outputSize;
  const savingsPercentage = ((savedBytes / inputSize) * 100).toFixed(2);

  console.log(`Compressed: ${outputFilePath}`);
  console.log(chalk.green("Image compressed successfully"));
  console.log(chalk.yellow(`Original size: ${formatBytes(inputSize)}`));
  console.log(chalk.yellow(`Compressed size: ${formatBytes(outputSize)}`));
  console.log(
    chalk.bold.green(
      `Data saved: ${formatBytes(savedBytes)} (${savingsPercentage}%)`
    )
  );
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
