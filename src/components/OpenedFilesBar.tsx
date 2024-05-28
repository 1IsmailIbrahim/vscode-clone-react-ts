import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../app/store";
import { setClickedFiles, setOpenedFiles } from "../app/features/fileTreeSlice";
import { IFile } from "../interfaces";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import DropMenu from "./ui/DropMenu";

const OpenedFilesBar = () => {
  const dispatch = useAppDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.fileTree);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentFile, setCurrentFile] = useState<IFile | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (event: React.MouseEvent, file: IFile) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuVisible(true);
    setCurrentFile(file);
  };

  const handleClick = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleCloseFile = (file: IFile) => {
    const filtered = openedFiles.filter((f) => f.id !== file.id);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFiles([]));
      dispatch(setClickedFiles({ name: "", content: "", activeTabId: null }));
      return;
    }
    const { id, name, content } = lastTab;
    dispatch(setOpenedFiles(filtered));
    dispatch(
      setClickedFiles({ name: name, content: content, activeTabId: id })
    );
  };

  const handleCloseAllFiles = () => {
    dispatch(setOpenedFiles([]));
    dispatch(setClickedFiles({ name: "", content: "", activeTabId: null }));
  };

  return (
    <div>
      <div className="flex">
        {openedFiles.map((file) => (
          <OpenedFilesBarTab
            key={file.id}
            file={file}
            onContextMenu={(e) => handleContextMenu(e, file)}
            onCloseFile={() => handleCloseFile(file)}
          />
        ))}
      </div>
      {menuVisible && (
        <DropMenu
          ref={contextMenuRef}
          visible={menuVisible}
          position={menuPosition}
          onClose={() => handleCloseFile(currentFile!)}
          onCloseAll={handleCloseAllFiles}
        />
      )}
    </div>
  );
};

export default OpenedFilesBar;
