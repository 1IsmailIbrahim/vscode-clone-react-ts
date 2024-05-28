import { IFile } from "../interfaces";

export const doesFileExist = (arr: IFile[], id: string) => {
  return arr.some((file) => file.id === id);
};
