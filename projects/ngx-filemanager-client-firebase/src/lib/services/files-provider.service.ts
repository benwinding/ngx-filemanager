import { Injectable } from '@angular/core';
import {
  ReqBodyList,
  ReqBodyRename,
  ReqBodyMove,
  ReqBodyCopy,
  ReqBodyRemove,
  ReqBodyEdit,
  ReqBodyGetContent,
  ReqBodyCreateFolder,
  ResBodyList,
  ResBodyRename,
  ResBodyMove,
  ResBodyCopy,
  ResBodyRemove,
  ResBodyEdit,
  ResBodyGetContent,
  ResBodyCreateFolder,
  ReqBodyAction,
  FileSystemProvider,
  ResBodySetPermissions,
  FileManagerAction
} from 'ngx-filemanager-core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilesSystemProviderService implements FileSystemProvider {
  private bucketname: string;
  private apiEndpoint: string;

  constructor(private http: HttpClient) {}

  private async fetchPostAuth<T>(url, body): Promise<T> {
    const options = {
      headers: {}
    };
    options['responseType'] = 'json';
    options.headers['Content-Type'] = 'application/json';
    const response = await this.http.post(url, body, options).toPromise();
    console.log({ response });
    return response as T;
  }

  private makeBaseRequest(action: FileManagerAction): ReqBodyAction {
    return {
      action: action,
      bucketname: this.bucketname
    };
  }

  Initialize(bucketname: string, apiEndpoint: string) {
    this.bucketname = bucketname;
    this.apiEndpoint = apiEndpoint;
  }

  List(path: string): Promise<ResBodyList> {
    const req: ReqBodyList = {
      ...this.makeBaseRequest('list'),
      path: path
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  CreateFolder(newPath: string): Promise<ResBodyCreateFolder> {
    const req: ReqBodyCreateFolder = {
      ...this.makeBaseRequest('createFolder'),
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  Copy(singleFileName: string, newPath: string): Promise<ResBodyCopy> {
    const req: ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      singleFileName: singleFileName,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  Move(item: string, newPath: string): Promise<ResBodyMove> {
    const req: ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: [item],
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  Rename(item: string, newItemPath: string): Promise<ResBodyRename> {
    const req: ReqBodyRename = {
      ...this.makeBaseRequest('rename'),
      item: item,
      newItemPath: newItemPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  Edit(item: string, content: string): Promise<ResBodyEdit> {
    const req: ReqBodyEdit = {
      ...this.makeBaseRequest('edit'),
      item: item,
      content: content
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  Getcontent(item: string): Promise<ResBodyGetContent> {
    const req: ReqBodyGetContent = {
      ...this.makeBaseRequest('getContent'),
      item: item
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  SetPermissions(
    item: string,
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    throw new Error('Method not implemented.');
  }
  MoveMultiple(items: string[], newPath: string): Promise<ResBodyMove> {
    const req: ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  CopyMultiple(items: string[], newPath: string): Promise<ResBodyCopy> {
    const req: ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }
  SetPermissionsMultiple(
    items: string[],
    perms: string,
    permsCode: string,
    recursive?: boolean
  ): Promise<ResBodySetPermissions> {
    throw new Error('Method not implemented.');
  }
  Remove(items: string[]): Promise<ResBodyRemove> {
    const req: ReqBodyRemove = {
      ...this.makeBaseRequest('remove'),
      items: items
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  GetUploadApiUrl(currentPath: string): string {
    const uploadApiEndpoint =
      this.apiEndpoint +
      '/upload?' +
      'bucketname=' +
      this.bucketname +
      '&directoryPath=' +
      currentPath;
    return uploadApiEndpoint;
  }
}
