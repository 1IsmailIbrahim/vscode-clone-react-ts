import { extentionIconPaths } from "../constant";
import IconImg from "./IconImg";
import FileIcon from "./SVG/File";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extention = filename.split(".").pop();

  if (
    extention &&
    extentionIconPaths.hasOwnProperty.call(extentionIconPaths, extention)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extentionIconPaths[extention]}-open.svg`
        : `${extentionIconPaths[extention]}.svg`
      : `${extentionIconPaths[extention]}.svg`;
    return <IconImg src={iconPath} />;
  }

  if (isFolder)
    return isOpen ? (
      <IconImg src="/icons/folder-default-open.svg" />
    ) : (
      <IconImg src="/icons/folder-default.svg" />
    );

  return <FileIcon />;
};

export default RenderFileIcon;
