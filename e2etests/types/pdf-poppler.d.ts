declare module 'pdf-poppler' {
  interface ConvertOptions {
    format: 'png' | 'jpeg';
    out_dir: string;
    out_prefix: string;
    page?: number;
    single_file?: boolean;
    print_file?: string;
    quality?: number;
  }

  interface ConvertResult {
    name: string;
    size: number;
    path: string;
    page: number;
  }

  export function convert(pdfPath: string, options: ConvertOptions): Promise<ConvertResult>;
}
