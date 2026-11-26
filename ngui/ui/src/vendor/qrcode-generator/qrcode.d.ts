// Types for the vendored `qrcode.mjs` — only the part the app uses. The full set ships as `dist/qrcode.d.ts`.

type TypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

type QRCode = {
  addData: (data: string) => void;
  make: () => void;
  getModuleCount: () => number;
  isDark: (row: number, col: number) => boolean;
};

/** `0` picks the smallest version that fits the data. */
declare const qrcode: (typeNumber: TypeNumber, errorCorrectionLevel: ErrorCorrectionLevel) => QRCode;

export default qrcode;
