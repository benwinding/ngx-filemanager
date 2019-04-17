import {
  ReqBodyList,
  ResBodyList,
  ReqBodyRename,
  ResBodyRename,
  ReqBodyMove,
  ResBodyMove,
  ReqBodyCopy,
  ResBodyCopy,
  ReqBodyRemove,
  ResBodyRemove,
  ReqBodyEdit,
  ResBodyEdit,
  ReqBodyGetContent,
  ResBodyGetContent,
  ReqBodyCreateFolder,
  ResBodyCreateFolder
} from 'ngx-filemanager-core/public_api';

export interface NgxFileMangerApiFireBase {
  HandleList(body: ReqBodyList): Promise<ResBodyList>;
  HandleRename(body: ReqBodyRename): Promise<ResBodyRename>;
  HandleMove(body: ReqBodyMove): Promise<ResBodyMove>;
  HandleCopy(body: ReqBodyCopy): Promise<ResBodyCopy>;
  HandleRemove(body: ReqBodyRemove): Promise<ResBodyRemove>;
  HandleEdit(body: ReqBodyEdit): Promise<ResBodyEdit>;
  HandleGetContent(body: ReqBodyGetContent): Promise<ResBodyGetContent>;
  HandleCreateFolder(body: ReqBodyCreateFolder): Promise<ResBodyCreateFolder>;
}
