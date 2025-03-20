/**
 * Script: generateEmails.js
 *
 * Requirements:
 * This script requires Node.js (v12 or later).
 *
 * Description:
 * Generates email templates by combining a common header, content files, and footer.
 * Original optScale files are located in folder herald/modules/email_generator/templates
 *
 * Usage:
 *   node tools/generate-emails/generateEmails.js --input <input_directory> --output <output_directory>
 *
 * Default Directories:
 *   - Input: 'custom' (contains partials and content files)
 *   - Output: '../../email_templates' (where generated emails are saved)
 */

const fs = require('fs');
const path = require('path');

/**
 * Parses command-line arguments to get user-specified input and output directories.
 * @param {string} flag - The flag to look for (e.g., "--input", "--output").
 * @returns {string|null} - The value of the flag or null if not provided.
 */
function getArgValue(flag) {
    const index = process.argv.indexOf(flag);
    return (index !== -1 && process.argv[index + 1]) ? process.argv[index + 1] : null;
}

// Get input and output paths from CLI flags or use default values
const inputPath = getArgValue('--input') || path.join(__dirname, 'custom');
const outputPath = getArgValue('--output') || path.join(__dirname, '../../email_templates');

// Resolve absolute paths for consistency
const absoluteInputPath = path.resolve(inputPath);
const absoluteOutputPath = path.resolve(outputPath);

/**
 * Ensures required files and directories exist, and loads header/footer content.
 * @returns {Object} - An object containing the header and footer HTML content.
 */
function setup() {
    const partialsPath = path.join(absoluteInputPath, 'partials');
    const headerPath = path.join(partialsPath, 'header.html');
    const footerPath = path.join(partialsPath, 'footer.html');

    // Ensure input directory exists
    if (!fs.existsSync(absoluteInputPath)) {
        console.error(`❌ Error: Input directory "${absoluteInputPath}" does not exist. Exiting...`);
        process.exit(1);
    }

    // Ensure 'partials' directory exists
    if (!fs.existsSync(partialsPath)) {
        console.error(`❌ Error: Partials directory "${partialsPath}" does not exist. Exiting...`);
        process.exit(1);
    }

    // Ensure header and footer files exist
    [headerPath, footerPath].forEach(filePath => {
        if (!fs.existsSync(filePath)) {
            console.error(`❌ Error: Missing required file "${filePath}". Exiting...`);
            process.exit(1);
        }
    });

    // Ensure output directory exists (create if necessary)
    if (!fs.existsSync(absoluteOutputPath)) {
        fs.mkdirSync(absoluteOutputPath, { recursive: true });
        console.log(`📁 Created output directory: ${absoluteOutputPath}`);
    }

    // Read and return header and footer content
    return {
        header: fs.readFileSync(headerPath, 'utf8'),
        footer: fs.readFileSync(footerPath, 'utf8'),
    };
}

/**
 * Reads the content of a file safely.
 * If reading fails, it logs an error and exits the script.
 * @param {string} filePath - Path to the file to read.
 * @returns {string} - The file content.
 */
function readFileSafe(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`❌ Error reading file: ${filePath}`, error);
        process.exit(1);
    }
}

/**
 * Retrieves all `.html` content files from the input directory.
 * This version includes **all** `.html` files.
 * @returns {string[]} - List of content file names.
 */
function getContentFiles() {
    const contentFiles = fs.readdirSync(absoluteInputPath)
        .filter(file => file.endsWith('.html')); // Includes all .html files

    if (contentFiles.length === 0) {
        console.error(`❌ Error: No valid content files found in "${absoluteInputPath}". Exiting...`);
        process.exit(1);
    }

    return contentFiles;
}

/**
 * Processes a single content file by merging it with the header and footer.
 * Saves the final merged email template in the output directory.
 * @param {string} contentFile - The content file to process.
 * @param {string} header - The common email header HTML.
 * @param {string} footer - The common email footer HTML.
 */
function processContentFile(contentFile, header, footer) {
    const contentPath = path.join(absoluteInputPath, contentFile);
    if (!fs.existsSync(contentPath)) {
        console.error(`⚠️ Warning: Content file "${contentFile}" not found. Skipping...`);
        return;
    }

    const content = readFileSafe(contentPath);
    const outputFilePath = path.join(absoluteOutputPath, contentFile);

    try {
        fs.writeFileSync(outputFilePath, `${header}${content}${footer}`, 'utf8');
        console.log(`✅ Generated email template: ${outputFilePath}`);
    } catch (error) {
        console.error(`❌ Error writing to file: ${outputFilePath}`, error);
    }
}

function main() {
    const { header, footer } = setup(); // Ensure all required files exist and get header/footer
    const contentFiles = getContentFiles(); // Load all .html files

    // Process each content file
    contentFiles.forEach(contentFile => processContentFile(contentFile, header, footer));

    console.log('🎉 All email templates have been successfully generated.');
}

// Run the script
main();
