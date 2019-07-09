import { ActionHandlersService } from './action-handlers.service';
import { TestBed } from '@angular/core/testing';
import { ClientFileSystemService } from '../filesystem/client-filesystem.service';
import { IconUrlResolverService } from '../utils/icon-url-resolver.service';
import { LoggerService } from '../logging/logger.service';
import { ConsoleLoggerService } from '../logging/console-logger.service';
import { PlatformLocation, APP_BASE_HREF } from '@angular/common';
import { NotificationService } from '../notifications/notification.service';
import { ServerFilesystemProviderService, getBaseHref, FileManagerConfig } from '../../public_api';
import { OptimisticFilesystemService } from '../filesystem/optimistic-filesystem.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HttpClient, HttpClientModule } from '@angular/common/http';

class SnackStub {
  notify(msg: string, title?: string, isError?: boolean) {}
  notifyCancelled() {}
}

class DialogStub {
  open(any?: any) {}
}

describe('', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: MatSnackBar, useClass: SnackStub },
        { provide: MatDialog, useClass: DialogStub },
        ServerFilesystemProviderService,
        NotificationService,
        {
          provide: APP_BASE_HREF,
          useFactory: getBaseHref,
          deps: [PlatformLocation]
        },
        { provide: LoggerService, useClass: ConsoleLoggerService },
        IconUrlResolverService,
        ClientFileSystemService,
        OptimisticFilesystemService,
        ActionHandlersService
      ]
    });
  });

  it('should creates and lists 2 folders', async () => {
    const serverFilesystem: ServerFilesystemProviderService = TestBed.get(ServerFilesystemProviderService);
    const actionHandlers: ActionHandlersService = TestBed.get(ActionHandlersService);
    const config: FileManagerConfig = {
      virtualRoot: '/'
    };
    actionHandlers.init(serverFilesystem, config);
    actionHandlers.OnNewFolder('/dir');
    // expect(2).(2);
  }, 60000);
});
