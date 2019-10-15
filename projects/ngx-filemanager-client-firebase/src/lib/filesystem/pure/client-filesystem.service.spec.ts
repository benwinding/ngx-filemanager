import { ConsoleLoggerService } from '../../logging';
import { IconUrlResolverService } from '../../utils';
import { ClientFileSystemService } from './client-filesystem.service';

function makeTestClient(): ClientFileSystemService {
  let client: ClientFileSystemService;
  const loggerService = new ConsoleLoggerService();
  const iconResolverService = new IconUrlResolverService('');
  client = new ClientFileSystemService(loggerService, iconResolverService);
  return client;
}

it('client creates and lists 2 folders', async () => {
  const client = makeTestClient();
  await client.OnCreateFolder('/dir1/');
  await client.OnCreateFolder('/dir2/');
  await client.OnList('/');
  const files = client.CurrentFiles().map(f => f.fullPath);
  expect(files.length).toBe(2);
}, 60000);

it('client creates 2 folders should add (2) to third', async () => {
  const client = makeTestClient();
  await client.OnCreateFolder('/dir1/');
  await client.OnCreateFolder('/dir2/');
  await client.OnCreateFolder('/dir2/');
  await client.OnList('/');
  const files = client.CurrentFiles().map(f => f.fullPath);
  expect(files.length).toBe(3);
  const hasFile = !!files.find(f => f.includes('dir2 (2)'));
  if (!hasFile) {
    console.log({files});
  }
  expect(hasFile).toBeTruthy();
}, 60000);

it('client creates 2 folders should add (2) to third', async () => {
  const client = makeTestClient();
  await client.OnCreateFolder('/dir1/');
  const nextFolder = client.getNextFreeFoldernameRecursively('/dir1/', '/');
  expect(nextFolder).toBe('/dir1 (2)/');
}, 60000);
