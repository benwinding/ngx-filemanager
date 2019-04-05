import * as api from 'ngx-filemanager-core';

export interface NgxFileMangerApiFireBase {
  HandleList(body: api.ReqBodyList): Promise<api.ResBodyList>;
  HandleRename(body: api.ReqBodyRename): Promise<api.ResBodyRename>;
  HandleMove(body: api.ReqBodyMove): Promise<api.ResBodyMove>;
  HandleCopy(body: api.ReqBodyCopy): Promise<api.ResBodyCopy>;
  HandleRemove(body: api.ReqBodyRemove): Promise<api.ResBodyRemove>;
  HandleEdit(body: api.ReqBodyEdit): Promise<api.ResBodyEdit>;
  HandleGetContent(body: api.ReqBodyGetContent): Promise<api.ResBodyGetContent>;
  HandleCreateFolder(body: api.ReqBodyCreateFolder): Promise<api.ResBodyCreateFolder>;
}
