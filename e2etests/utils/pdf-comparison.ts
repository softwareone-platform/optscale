import fs from 'fs/promises';
import path from 'path';
import { comparePngImages } from './image-comparison';
import { debugLog } from './debug-logging';

/**
 * Converts a PDF file to a PNG image file.
 *
 * @param {string} pdfPath - The path to the PDF file to be converted.
 * @param {string} outputPngPath - The path where the converted PNG file will be saved.
 * @throws Will throw an error if the PDF conversion fails.
 */
async function convertPdfToPng(pdfPath: string, outputPngPath: string): Promise<void> {
  const { convert } = await import('pdf-poppler');

  const options = {
    format: 'png' as const,
    out_dir: path.dirname(outputPngPath),
    out_prefix: 'temp_pdf_page',
    page: 1, // Convert only the first page
  };

  try {
    await convert(pdfPath, options);

    // pdf-poppler creates files with format: temp_pdf_page-1.png
    const generatedFile = path.join(path.dirname(outputPngPath), 'temp_pdf_page-1.png');

    // Move the generated file to the expected location
    await fs.rename(generatedFile, outputPngPath);
  } catch (error) {
    console.error(`PDF conversion failed: ${error}`);
    throw error;
  }
}

/**
 * Compares two PDF files by converting them to PNG images and performing a visual comparison.
 *
 * @param {string} expectedPdfPath - The path to the expected PDF file.
 * @param {string} actualPdfPath - The path to the actual PDF file.
 * @param {string} [diffPath] - Optional path to save the visual difference image.
 * @returns {Promise<boolean>} - Returns `true` if the PDFs are visually identical, otherwise `false`.
 * @throws Will throw an error if the PDF conversion or comparison fails.
 */
export async function comparePdfFiles(expectedPdfPath: string, actualPdfPath: string, diffPath?: string): Promise<boolean> {
  // Check if both PDF files exist
  try {
    await fs.access(expectedPdfPath);
    await fs.access(actualPdfPath);
  } catch (error) {
    console.error(`PDF file not found: ${error}`);
    return false;
  }

  // Create PNG file paths for inspection
  const expectedPngPath = `${expectedPdfPath}.converted.png`;
  const actualPngPath = `${actualPdfPath}.converted.png`;

  // Convert both PDFs to PNG files
  try {
    await Promise.all([convertPdfToPng(expectedPdfPath, expectedPngPath), convertPdfToPng(actualPdfPath, actualPngPath)]);

    debugLog(`Expected PDF converted to: ${expectedPngPath}`);
    debugLog(`Actual PDF converted to: ${actualPngPath}`);

    // Compare the PNG images
    return await comparePngImages(expectedPngPath, actualPngPath, diffPath);
  } catch (error) {
    console.error(`PDF conversion or comparison failed: ${error}`);
    return false;
  } finally {
    // Clean up converted PNG files if the CLEAN_UP environment variable is set
    if (process.env.CLEAN_UP === 'true') {
      await Promise.all([fs.unlink(expectedPngPath).catch(() => {}), fs.unlink(actualPngPath).catch(() => {})]);
    }
  }
}
