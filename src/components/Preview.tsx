import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFilesBar from "./OpenedFilesBar";
import { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { content },
  } = useSelector((state: RootState) => state.fileTree);

  return (
    <div>
      <OpenedFilesBar />
      <FileSyntaxHighlighter content={content} />
    </div>
  );
};

export default Preview;
