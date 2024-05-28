import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { RootState, useAppDispatch } from "../app/store";
import { setClickedFiles, setOpenedFiles } from "../app/features/fileTreeSlice";
import { useSelector } from "react-redux";
import { doesFileExist } from "../utils/Functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // ** Handlers
  const toggle = () => setIsOpen((prev) => !prev);
  const onFileCliked = () => {
    const exists = doesFileExist(openedFiles, id);
    dispatch(
      setClickedFiles({ name: name, content: content, activeTabId: id })
    );
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };
  return (
    <div className="space-y-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-1">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center">
            <span> {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}</span>
            <RenderFileIcon
              isFolder={isFolder}
              isOpen={isOpen}
              filename={name}
            />
            <span className="ml-1">{name}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1" onClick={onFileCliked}>
            <RenderFileIcon filename={name} />
            <span>{name}</span>
          </div>
        )}
      </div>

      {isOpen &&
        children?.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
