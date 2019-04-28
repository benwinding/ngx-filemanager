import { GetList } from './list';
import { RenameFile } from './rename';
import { MoveFiles } from './move';
import { CopyFiles } from './copy';
import { RemoveFiles } from './remove';
import { EditFile } from './edit';
import { GetFileContent } from './getContent';
import { GetFileMeta } from './getMeta';
import { CreateFolder } from './createFolder';
import { ChangePermissions } from './changePermissions';
import { UploadFile } from './uploadFile';

export const commands = {
  GetList,
  RenameFile,
  MoveFiles,
  CopyFiles,
  RemoveFiles,
  EditFile,
  GetFileContent,
  GetFileMeta,
  CreateFolder,
  ChangePermissions,
  UploadFile
};
