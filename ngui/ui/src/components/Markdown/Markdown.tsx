import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Highlight, themes } from "prism-react-renderer";
import ReactMarkdown from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import { v4 as uuidv4 } from "uuid";
import CopyText from "components/CopyText";
import { MarkdownProps } from "./types";

const THEME = themes.github;
const PADDING = "0.5em";

function reactMarkdownRemarkDirective() {
  return (tree) => {
    visit(tree, ["textDirective", "leafDirective", "containerDirective"], (node) => {
      // won't work without reassign.
      // eslint-disable-next-line no-param-reassign
      node.data = {
        hName: node.name,
        hProperties: node.attributes,
        ...node.data
      };
      return node;
    });
  };
}

const Markdown = ({ children, transformImageUri }: MarkdownProps) => (
  <Box
    sx={{
      "& > :last-child": {
        marginBottom: 0
      }
    }}
  >
    <ReactMarkdown
      transformImageUri={(uri) => (typeof transformImageUri === "function" ? transformImageUri(uri) : uri)}
      linkTarget="_blank"
      components={{
        a: ({ children: markdownChildren, href }) => (
          <Link href={href} target="_blank" rel="noopener noreferrer">
            {markdownChildren}
          </Link>
        ),
        h1: ({ children: markdownChildren }) => (
          <Typography variant="h6" component="h1" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        h2: ({ children: markdownChildren }) => (
          <Typography variant="h6" component="h2" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        h3: ({ children: markdownChildren }) => (
          <Typography variant="subtitle1" component="h3" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        h4: ({ children: markdownChildren }) => (
          <Typography variant="subtitle1" component="h4" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        h5: ({ children: markdownChildren }) => (
          <Typography variant="body1" component="h5" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        h6: ({ children: markdownChildren }) => (
          <Typography variant="body1" component="h6" gutterBottom>
            {markdownChildren}
          </Typography>
        ),
        p: ({ children: markdownChildren }) => <Typography gutterBottom>{markdownChildren}</Typography>,
        img: ({ src, alt }) => <img style={{ maxWidth: "100%" }} src={src} alt={alt} />,
        li: ({ children: liChildren }) => <Typography component="li">{liChildren}</Typography>,
        ul: ({ children: ulChildren }) => (
          <Typography component="ul" gutterBottom>
            {ulChildren}
          </Typography>
        ),
        pre: ({ children: pChildren }) => {
          const codeText = pChildren[0].props.children;

          return (
            <Typography
              component="div"
              gutterBottom
              sx={(theme) => ({
                borderRadius: theme.spacing(0.5),
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                backgroundColor: THEME.plain.backgroundColor
              })}
            >
              {pChildren}
              <CopyText
                text={codeText}
                sx={{
                  padding: PADDING
                }}
              />
            </Typography>
          );
        },
        code: ({ inline, className, children: codeChildren }) => {
          const match = /language-(\w+)/.exec(className || "");

          // Block code
          if (!inline && match) {
            return (
              <Highlight theme={THEME} code={String(codeChildren).replace(/\n$/, "")} language={match[1]}>
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <Box
                    component="pre"
                    style={{
                      ...style,
                      margin: 0,
                      padding: PADDING,
                      overflow: "auto"
                    }}
                  >
                    {tokens.map((line) => (
                      <div key={uuidv4()} {...getLineProps({ line })}>
                        {line.map((token) => (
                          <span key={uuidv4()} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </Box>
                )}
              </Highlight>
            );
          }

          // Inline code
          return (
            <Typography
              component="code"
              sx={(theme) => ({
                backgroundColor: THEME.plain.backgroundColor,
                px: theme.spacing(0.5),
                py: theme.spacing(0.25),
                borderRadius: theme.spacing(0.5)
              })}
            >
              {codeChildren}
            </Typography>
          );
        }
      }}
      remarkPlugins={[remarkGfm, remarkDirective, reactMarkdownRemarkDirective]}
    >
      {children}
    </ReactMarkdown>
  </Box>
);

export default Markdown;
