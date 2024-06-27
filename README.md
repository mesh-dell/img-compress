# img-compress

`img-compress` is a command-line interface (CLI) application that compresses all images in a specified directory. It supports multiple image formats and provides options to specify output paths.

## Features

- Compresses images in formats: `.jpeg`, `.jpg`, `.png`, `.webp`, `.gif`, `.avif`, `.tiff`
- Allows specifying an output directory
- Displays compression statistics including total input size, total saved bytes, and average savings percentage

## Installation

Ensure you have Node.js installed on your machine. Then, install the required dependencies:

```bash
npm install commander sharp chalk
```

## Usage

To use the `img-compress` CLI, follow these steps:

1. Navigate to the directory where `img-compress` is located.
2. Run the `compress` command with the input path of the directory containing images.

### Command

```bash
node img-compress compress <path> [options]
```

### Arguments

- `<path>`: The input path to the directory containing images to compress.

### Options

- `-o, --output <string>`: (Optional) The output path to save the compressed images. If not specified, the compressed images will be saved in the input directory.

### Examples

Compress images in the `./images` directory and save them in the same directory:

```bash
node img-compress compress ./images
```

Compress images in the `./images` directory and save them in the `./compressed` directory:

```bash
node img-compress compress ./images -o ./compressed
```

## Output

After running the `compress` command, the application will:

1. Compress each image in the specified directory.
2. Save the compressed images in the specified output directory or the input directory if no output directory is specified.
3. Display compression statistics:

   - Total input size
   - Total saved bytes
   - Average savings percentage

## Example Output

```plaintext
Compressed: ./compressed/image1_compressed.jpg
Image compressed successfully
Original size: 1.2 MB
Compressed size: 800 KB
Data saved: 400 KB (33.33%)

Total input size: 3.6 MB
Total saved bytes: 1.2 MB
Average savings percentage: 33.33 %
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Commander.js](https://github.com/tj/commander.js/) - For CLI argument parsing
- [Sharp](https://github.com/lovell/sharp) - For image processing
- [Chalk](https://github.com/chalk/chalk) - For terminal string styling
