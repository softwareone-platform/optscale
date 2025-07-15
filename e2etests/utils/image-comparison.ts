import fs from 'fs';
import { PNG } from 'pngjs';

/**
 * Compare two PNG images for visual equality.
 *
 * @param imgPath1 - Path to first image.
 * @param imgPath2 - Path to second image.
 * @param diffPath - Optional path to save visual diff.
 * @returns true if images are visually identical.
 */
export async function comparePngImages(
    imgPath1: string,
    imgPath2: string,
    diffPath?: string
): Promise<boolean> {
    const { default: pixelmatch } = await import('pixelmatch');

    const img1 = PNG.sync.read(fs.readFileSync(imgPath1));
    const img2 = PNG.sync.read(fs.readFileSync(imgPath2));

    if (img1.width !== img2.width || img1.height !== img2.height) {
        throw new Error(`Image dimensions do not match: ${imgPath1} vs ${imgPath2}`);
    }

    const diff = new PNG({ width: img1.width, height: img1.height });

    const numDiffPixels = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
    );

    if (diffPath) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return numDiffPixels === 0;
}
