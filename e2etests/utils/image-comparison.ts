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

    const width = Math.max(img1.width, img2.width);
    const height = Math.max(img1.height, img2.height);

    // Pad images to same size if needed
    const paddedImg1 = new PNG({ width, height });
    const paddedImg2 = new PNG({ width, height });

    PNG.bitblt(img1, paddedImg1, 0, 0, img1.width, img1.height, 0, 0);
    PNG.bitblt(img2, paddedImg2, 0, 0, img2.width, img2.height, 0, 0);

    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
        paddedImg1.data,
        paddedImg2.data,
        diff.data,
        width,
        height,
        { threshold: 0, diffMask: false }
    );

    if (diffPath && numDiffPixels > 0) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
    }

    return numDiffPixels === 0;
}
