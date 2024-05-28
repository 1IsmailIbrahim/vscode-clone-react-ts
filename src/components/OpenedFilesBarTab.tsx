import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setClickedFiles } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { IFile } from '../interfaces';
import RenderFileIcon from './RenderFileIcon';
import CloseIcon from './SVG/CloseIcon';

interface IProps {
  file: IFile;
  onContextMenu: (e: React.MouseEvent) => void;
  onCloseFile: () => void;
}

const OpenedFilesBarTab: React.FC<IProps> = ({ file, onContextMenu, onCloseFile }) => {
  const dispatch = useDispatch();
  const { activeTabId } = useSelector((state: RootState) => state.fileTree.clickedFile);

  const onclick = () => {
    const { id, name, content } = file;
    dispatch(setClickedFiles({ name, content, activeTabId: id }));
  };

  return (
    <div
      onClick={onclick}
      onContextMenu={onContextMenu}
      className={`flex p-2 min-w-[170px] select-none items-center cursor-pointer hover:bg-neutral-950 duration-300 border-x-[0.1px] border-x-[#ffffff1f] border-t-[1px] ${
        file.id === activeTabId
          ? "bg-neutral-950 border-t-blue-500"
          : " border-t-transparent"
      }`}
    >
      <div className="flex items-center space-x-1">
        <RenderFileIcon filename={file.name} />
        <span className="flex justify-center w-fit mx-2 p-1">{file.name}</span>
      </div>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onCloseFile();
        }}
        className="flex items-center w-fit ml-auto p-1 rounded-md hover:bg-[#64646473] duration-300"
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
