import { CoreTypes } from 'ngx-filemanager-core';

export interface NgxFileMangerApiFireBase {
  HandleList(body: CoreTypes.ReqBodyList): Promise<CoreTypes.ResBodyList>;
  HandleRename(body: CoreTypes.ReqBodyRename): Promise<CoreTypes.ResBodyRename>;
  HandleMove(body: CoreTypes.ReqBodyMove): Promise<CoreTypes.ResBodyMove>;
  HandleCopy(body: CoreTypes.ReqBodyCopy): Promise<CoreTypes.ResBodyCopy>;
  HandleRemove(body: CoreTypes.ReqBodyRemove): Promise<CoreTypes.ResBodyRemove>;
  HandleEdit(body: CoreTypes.ReqBodyEdit): Promise<CoreTypes.ResBodyEdit>;
  HandleGetContent(body: CoreTypes.ReqBodyGetContent): Promise<CoreTypes.ResBodyGetContent>;
  HandleCreateFolder(body: CoreTypes.ReqBodyCreateFolder): Promise<CoreTypes.ResBodyCreateFolder>;
}
