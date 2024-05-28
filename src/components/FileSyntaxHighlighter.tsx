import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IProps {
  content: string | undefined;
}
const FileSyntaxHighlighter = ({ content = "" }: IProps) => {
  return (
    <SyntaxHighlighter
      language="typescript"
      style={atomOneDark}
      customStyle={{
        background: "transparent",
        width: "100%",
        maxHeight: "100vh",
        overflowX: "hidden",
      }}
      showLineNumbers
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlighter;
