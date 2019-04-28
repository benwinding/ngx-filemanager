import { Injectable } from '@angular/core';
import * as core from 'ngx-filemanager-core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logging/logger.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class ServerFilesystemProviderService
  implements core.FileSystemProvider {
  private bucketname: string;
  private apiEndpoint: string;

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private notifications: NotificationService
  ) {}

  private async fetchPostAuth<T>(url, body): Promise<T> {
    const options = {
      headers: {}
    };
    options['responseType'] = 'json';
    options.headers['Content-Type'] = 'application/json';
    try {
      const response = await this.http.post(url, body, options).toPromise();
      this.logger.info('fetchPostAuth: ', {
        action: body.action,
        reqBody: body,
        resBody: response
      });
      return response as T;
    } catch (apiErrorResponse) {
      console.error('API Post Error', {apiErrorResponse});
      if (apiErrorResponse.error && apiErrorResponse.error.errorDetail) {
        const detail = apiErrorResponse.error.errorDetail;
        throw new Error(
          'API Response: ' + detail
        );
      }
      throw new Error(
        'API request failed, status:' + apiErrorResponse.statusText
      );
  }
  }

  private makeBaseRequest(action: core.FileManagerAction): core.ReqBodyAction {
    return {
      action: action,
      bucketname: this.bucketname
    };
  }

  Initialize(bucketname: string, apiEndpoint: string) {
    this.bucketname = bucketname;
    this.apiEndpoint = apiEndpoint;
  }

  List(path: string): Promise<core.ResBodyList> {
    const req: core.ReqBodyList = {
      ...this.makeBaseRequest('list'),
      path: path
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  CreateFolder(newPath: string): Promise<core.ResBodyCreateFolder> {
    const req: core.ReqBodyCreateFolder = {
      ...this.makeBaseRequest('createFolder'),
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Copy(singleFileName: string, newPath: string): Promise<core.ResBodyCopy> {
    const req: core.ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      singleFileName: singleFileName,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Move(item: string, newPath: string): Promise<core.ResBodyMove> {
    const req: core.ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: [item],
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Rename(item: string, newItemPath: string): Promise<core.ResBodyRename> {
    const req: core.ReqBodyRename = {
      ...this.makeBaseRequest('rename'),
      item: item,
      newItemPath: newItemPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Edit(item: string, content: string): Promise<core.ResBodyEdit> {
    const req: core.ReqBodyEdit = {
      ...this.makeBaseRequest('edit'),
      item: item,
      content: content
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Getcontent(item: string): Promise<core.ResBodyGetContent> {
    const req: core.ReqBodyGetContent = {
      ...this.makeBaseRequest('getContent'),
      item: item
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  SetPermissions(
    item: string,
    role: core.PermissionsRole,
    entity: core.PermissionEntity,
    recursive?: boolean
  ): Promise<core.ResBodySetPermissions> {
    const req: core.ReqBodySetPermissions = {
      ...this.makeBaseRequest('changePermissions'),
      items: [item],
      role: role,
      entity: entity,
      recursive: recursive
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  MoveMultiple(items: string[], newPath: string): Promise<core.ResBodyMove> {
    const req: core.ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  CopyMultiple(items: string[], newPath: string): Promise<core.ResBodyCopy> {
    const req: core.ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  SetPermissionsMultiple(
    items: string[],
    role: core.PermissionsRole,
    entity: core.PermissionEntity,
    recursive?: boolean
  ): Promise<core.ResBodySetPermissions> {
    const req: core.ReqBodySetPermissions = {
      ...this.makeBaseRequest('changePermissions'),
      items: items,
      role: role,
      entity: entity,
      recursive: recursive
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Remove(items: string[]): Promise<core.ResBodyRemove> {
    const req: core.ReqBodyRemove = {
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

  async CreateDownloadLink(file: core.ResFile): Promise<string> {
    try {
      const req: core.ReqBodyGetMeta = {
        ...this.makeBaseRequest('getMeta'),
        item: file.fullPath
      };
      const response = await this.fetchPostAuth<core.ResBodyGetMeta>(
        this.apiEndpoint,
        req
      );
      const url = response.result.url;
      return url;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
