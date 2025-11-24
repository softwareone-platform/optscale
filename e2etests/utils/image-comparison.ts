import fs from 'fs';
import { PNG } from 'pngjs';


/**
 * Compare two PNG images allowing a configurable margin of error.
 *
 * @param imgPath1 Path to first image.
 * @param imgPath2 Path to second image.
 * @param diffPath Optional path to write a diff image when differences exceed tolerance.
 * @param options Optional comparison settings.
 * @param options.threshold Pixelmatch sensitivity (0..1). Higher -> more differences detected. Default 0.1.
 * @param options.tolerancePixels Maximum differing pixels allowed. Overrides toleranceRatio if set.
 * @param options.toleranceRatio Maximum differing pixel ratio (0..1) allowed if tolerancePixels not provided.
 * @returns true if images are within tolerance.
 */
export async function comparePngImages(
  imgPath1: string,
  imgPath2: string,
  diffPath?: string,
  options?: {
    threshold?: number;
    tolerancePixels?: number;
    toleranceRatio?: number;
  }
): Promise<boolean> {
  const { default: pixelmatch } = await import('pixelmatch');

  const img1 = PNG.sync.read(fs.readFileSync(imgPath1));
  const img2 = PNG.sync.read(fs.readFileSync(imgPath2));

  const width = Math.max(img1.width, img2.width);
  const height = Math.max(img1.height, img2.height);

  const paddedImg1 = new PNG({ width, height });
  const paddedImg2 = new PNG({ width, height });

  PNG.bitblt(img1, paddedImg1, 0, 0, img1.width, img1.height, 0, 0);
  PNG.bitblt(img2, paddedImg2, 0, 0, img2.width, img2.height, 0, 0);

  const diff = new PNG({ width, height });

  const threshold = options?.threshold ?? 0.1;
  const numDiffPixels = pixelmatch(
    paddedImg1.data,
    paddedImg2.data,
    diff.data,
    width,
    height,
    { threshold, diffMask: false }
  );

  const maxAllowed =
    options?.tolerancePixels ??
    Math.floor((options?.toleranceRatio ?? 0) * width * height);

  const withinTolerance = numDiffPixels <= maxAllowed;

  if (diffPath && !withinTolerance) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  return withinTolerance;
}
