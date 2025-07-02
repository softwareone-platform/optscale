export type MarkdownProps = {
  children: string;
  transformImageUri?: (uri: string) => string;
};
