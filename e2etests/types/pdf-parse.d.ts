declare module 'pdf-parse' {
  interface PDFMetadata {
    info?: Record<string, unknown>;
    metadata?: unknown;
    version?: string;
  }

  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info?: PDFMetadata['info'];
    metadata?: PDFMetadata['metadata'];
    text: string;
    version?: string;
  }

  type PDFData = Buffer | Uint8Array;

  function pdfParse(data: PDFData, options?: Record<string, unknown>): Promise<PDFParseResult>;
  export = pdfParse;
}
