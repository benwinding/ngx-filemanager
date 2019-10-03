import { Injectable } from '@angular/core';
import {
  CoreTypes,
  FileSystemProvider
} from 'projects/ngx-filemanager-core/src/public_api';
import { LoggerService } from '../logging/logger.service';
import {
  translateStorageItemToResFile,
  translateStoragePrefixToResFile
} from './server-sdk-translators';

@Injectable()
export class ServerSDKFilesystemProviderService implements FileSystemProvider {
  private bucket: firebase.storage.Storage;

  constructor(private logger: LoggerService) {}

  Initialize(config: { bucket: firebase.storage.Storage }): void {
    this.bucket = config.bucket;
  }

  async List(path: string): Promise<CoreTypes.ResBodyList> {
    this.logger.info('List()', {path});
    const results = await this.bucket.ref(path).list();
    const filesProm = Promise.all(
      results.items.map(ref => translateStorageItemToResFile(ref))
    );
    const prefixesProm = Promise.all(
      results.prefixes.map(ref => translateStoragePrefixToResFile(ref))
    );
    const [prefixes, files] = await Promise.all([filesProm, prefixesProm]);
    return {
      result: prefixes.concat(files)
    };
  }

  CreateFolder(
    newPath: string,
    disableNoClobber?: boolean
  ): Promise<CoreTypes.ResBodyCreateFolder> {
    this.logger.info('List()', {newPath});
    return this.makeAPIRequest('createFolder')
      .PatchBody<CoreTypes.ReqBodyCreateFolder>({
        newPath: newPath
      })
      .POST();
  }

  Copy(
    singleFileName: string,
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    return this.makeAPIRequest('copy')
      .PatchBody<CoreTypes.ReqBodyCopy>({
        singleFileName: singleFileName,
        newPath: newPath
      })
      .POST();
  }

  Move(item: string, newPath: string): Promise<CoreTypes.ResBodyMove> {
    return this.makeAPIRequest('move')
      .PatchBody<CoreTypes.ReqBodyMove>({
        items: [item],
        newPath: newPath
      })
      .POST();
  }

  Rename(item: string, newItemPath: string): Promise<CoreTypes.ResBodyRename> {
    return this.makeAPIRequest('rename')
      .PatchBody<CoreTypes.ReqBodyRename>({
        item: item,
        newItemPath: newItemPath
      })
      .POST();
  }

  Edit(item: string, content: string): Promise<CoreTypes.ResBodyEdit> {
    return this.makeAPIRequest('edit')
      .PatchBody<CoreTypes.ReqBodyEdit>({
        item: item,
        content: content
      })
      .POST();
  }

  Getcontent(item: string): Promise<CoreTypes.ResBodyGetContent> {
    return this.makeAPIRequest('getContent')
      .PatchBody<CoreTypes.ReqBodyEdit>({
        item: item
      })
      .POST();
  }

  SetPermissions(
    item: string,
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    return this.makeAPIRequest('changePermissions')
      .PatchBody<CoreTypes.ReqBodySetPermissions>({
        items: [item],
        role: role,
        entity: entity,
        recursive: recursive
      })
      .POST();
  }

  MoveMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyMove> {
    return this.makeAPIRequest('move')
      .PatchBody<CoreTypes.ReqBodyMove>({
        items: items,
        newPath: newPath
      })
      .POST();
  }

  CopyMultiple(
    items: string[],
    newPath: string
  ): Promise<CoreTypes.ResBodyCopy> {
    return this.makeAPIRequest('copy')
      .PatchBody<CoreTypes.ReqBodyCopy>({
        items: items,
        newPath: newPath
      })
      .POST();
  }

  SetPermissionsMultiple(
    items: string[],
    role: CoreTypes.PermissionsRole,
    entity: CoreTypes.FilePermissionEntity,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    return this.makeAPIRequest('changePermissions')
      .PatchBody<CoreTypes.ReqBodySetPermissions>({
        items: items,
        role: role,
        entity: entity,
        recursive: recursive
      })
      .POST();
  }

  SetPermissionsObjectMultiple(
    items: string[],
    permissionsObj: CoreTypes.FilePermissionsObject,
    recursive?: boolean
  ): Promise<CoreTypes.ResBodySetPermissions> {
    return this.makeAPIRequest('changePermissionsObject')
      .PatchBody<CoreTypes.ReqBodySetPermissionsObject>({
        items: items,
        permissionsObj: permissionsObj,
        recursive: recursive
      })
      .POST();
  }

  Remove(items: string[]): Promise<CoreTypes.ResBodyRemove> {
    return this.makeAPIRequest('remove')
      .PatchBody<CoreTypes.ReqBodyRemove>({
        items: items
      })
      .POST();
  }

  GetSingle(item: string): Promise<CoreTypes.ResBodyGetSingle> {
    return this.makeAPIRequest('getSingle')
      .PatchBody<CoreTypes.ReqBodyGetSingle>({
        item: item
      })
      .POST();
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
      const response: CoreTypes.ResBodyGetSingle = await this.makeAPIRequest(
        'getSingle'
      )
        .PatchBody<CoreTypes.ReqBodyGetSingle>({
          item: file.fullPath
        })
        .POST();
      const url = response.result.url;
      return url;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async Upload(item: string): Promise<boolean> {
    return null;
  }
}
