import { Injectable } from '@angular/core';
import { CoreTypes, FileSystemProvider } from 'ngx-filemanager-core/public_api';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../logging/logger.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable()
export class ServerFilesystemProviderService implements FileSystemProvider {
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
      console.error('API Post Error', { apiErrorResponse });
      if (apiErrorResponse.error && apiErrorResponse.error.errorDetail) {
        const detail = apiErrorResponse.error.errorDetail;
        throw new Error('API Response: ' + detail);
      }
      throw new Error(
        'API request failed, status:' + apiErrorResponse.statusText
      );
    }
  }

  private makeBaseRequest(
    action: CoreTypes.FileManagerAction
  ): CoreTypes.ReqBodyAction {
    return {
      action: action,
      bucketname: this.bucketname
    };
  }

  Initialize(bucketname: string, apiEndpoint: string) {
    this.bucketname = bucketname;
    this.apiEndpoint = apiEndpoint;
  }

  List(path: string): Promise<CoreTypes.ResBodyList> {
    const req: CoreTypes.ReqBodyList = {
      ...this.makeBaseRequest('list'),
      path: path
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  CreateFolder(newPath: string): Promise<CoreTypes.ResBodyCreateFolder> {
    const req: CoreTypes.ReqBodyCreateFolder = {
      ...this.makeBaseRequest('createFolder'),
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Copy(
    singleFileName: string,
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    const req: CoreTypes.ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      singleFileName: singleFileName,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Move(item: string, newPath: string): Promise<CoreTypes.ResBodyMove> {
    const req: CoreTypes.ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: [item],
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Rename(item: string, newItemPath: string): Promise<CoreTypes.ResBodyRename> {
    const req: CoreTypes.ReqBodyRename = {
      ...this.makeBaseRequest('rename'),
      item: item,
      newItemPath: newItemPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Edit(item: string, content: string): Promise<CoreTypes.ResBodyEdit> {
    const req: CoreTypes.ReqBodyEdit = {
      ...this.makeBaseRequest('edit'),
      item: item,
      content: content
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Getcontent(item: string): Promise<CoreTypes.ResBodyGetContent> {
    const req: CoreTypes.ReqBodyGetContent = {
      ...this.makeBaseRequest('getContent'),
      item: item
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  SetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    const req: CoreTypes.ReqBodySetPermissions = {
      ...this.makeBaseRequest('changePermissions'),
      items: [item],
      role: role,
      entity: entity,
      recursive: recursive
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  MoveMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyMove> {
    const req: CoreTypes.ReqBodyMove = {
      ...this.makeBaseRequest('move'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  CopyMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    const req: CoreTypes.ReqBodyCopy = {
      ...this.makeBaseRequest('copy'),
      items: items,
      newPath: newPath
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  SetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    const req: CoreTypes.ReqBodySetPermissions = {
      ...this.makeBaseRequest('changePermissions'),
      items: items,
      role: role,
      entity: entity,
      recursive: recursive
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  SetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    const req: CoreTypes.ReqBodySetPermissionsObject = {
      ...this.makeBaseRequest('changePermissionsObject'),
      items: items,
      permissionsObj: permissionsObj,
      recursive: recursive
    };
    return this.fetchPostAuth(this.apiEndpoint, req);
  }

  Remove(items: string[]): Promise<CoreTypes.ResBodyRemove> {
    const req: CoreTypes.ReqBodyRemove = {
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

  async CreateDownloadLink(file: CoreTypes.ResFile): Promise<string> {
    try {
      const req: CoreTypes.ReqBodyGetSingle = {
        ...this.makeBaseRequest('getSingle'),
        item: file.fullPath
      };
      const response = await this.fetchPostAuth<CoreTypes.ResBodyGetSingle>(
        this.apiEndpoint,
        req
      );
      const url = response.result.url;
      return url;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async Upload(item: string): Promise<boolean> {
    return null;
  }

  async GetSingle(item: string): Promise<CoreTypes.ResBodyGetSingle> {
    try {
      const req: CoreTypes.ReqBodyGetSingle = {
        ...this.makeBaseRequest('getSingle'),
        item: item
      };
      const response = await this.fetchPostAuth<CoreTypes.ResBodyGetSingle>(
        this.apiEndpoint,
        req
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
