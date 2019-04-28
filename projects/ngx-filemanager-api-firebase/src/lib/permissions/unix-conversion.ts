export class PermissionsUnix {
  constructor(private unixPermissionsString: string) {
    this.checkValid(this.unixPermissionsString);
  }

  checkValid(unixPermissionsString: string) {}

  toOctal(): string {
    const str = this.unixPermissionsString;
    const first = Array.from(str).slice(0, 3);
    const second = Array.from(str).slice(4, 7);
    const third = Array.from(str).slice(8, 10);
    return;
  }
}

/*
  Number	Octal Permission Representation	Ref
  0	 ---  No permission
  1	 --x  Execute permission
  2	 -w-  Write permission
  3	 -wx  Execute and write permission: 1 (execute) + 2 (write) = 3
  4	 r--  Read permission
  5	 r-x  Read and execute permission: 4 (read) + 1 (execute) = 5
  6	 rw-  Read and write permission: 4 (read) + 2 (write) = 6
  7	 rwx  All permissions: 4 (read) + 2 (write) + 1 (execute) = 7
*/

export function CheckUnixStringIsValid(unixPermissionsString: string) {
  if (unixPermissionsString.length !== 9) {
    throw new Error('Permissions string must be 9 characters');
  }
  const hasDifferentCharacters = !!unixPermissionsString.match('[^-wrx]');
  if (hasDifferentCharacters) {
    throw new Error('Permissions string can only have the characters: "-wrx" ');
  }
}

const OctalPermissions: [UnixPermissionsString, UnixPermissionsOctal][] = [
  ['---', '0'],
  ['--x', '1'],
  ['-w-', '2'],
  ['-wx', '3'],
  ['r--', '4'],
  ['r-x', '5'],
  ['rw-', '6'],
  ['rwx', '7']
];

export type UnixPermissionsString =
  | '---'
  | '--x'
  | '-w-'
  | '-wx'
  | 'r--'
  | 'r-x'
  | 'rw-'
  | 'rwx';
export type UnixPermissionsOctal =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7';

export function PermissionsUnixToOctal(
  input: UnixPermissionsString
): UnixPermissionsOctal {
  const octalString = OctalPermissions.find(pair => pair[0] === input)[1];
  if (!octalString) {
    throw new Error(`PermissionsUnixToOctal: cannot convert:"${input}"`);
  }
  return octalString;
}

export function PermissionsOctalToUnix(
  input: UnixPermissionsOctal
): UnixPermissionsString {
  const permissionsString = OctalPermissions.find(pair => pair[1] === input)[0];
  if (!permissionsString) {
    throw new Error(`PermissionsOctalToUnix: cannot convert:"${input}"`);
  }
  return permissionsString;
}

export type FilePermission = 'write' | 'read' | 'execute';

export function CheckUnixOctal(input: string, toCheck: FilePermission) {
  if (!input || !input.length || input.length !== 1) {
    throw new Error(
      'PermissionsUnixStringToArray: input OctalString must be 1 characters long: recieved=' +
        input
    );
  }
  const octalNumber = Number(input);
  switch (toCheck) {
    case 'write':
      return canWRITE(octalNumber);
    case 'read':
      return canREAD(octalNumber);
    case 'execute':
      return canEXECUTE(octalNumber);
    default:
  }
}

export function canREAD(octalNumber: number) {
  return octalNumber > 3;
}
export function canEXECUTE(octalNumber: number) {
  return (octalNumber % 2) > 0;
}
export function canWRITE(octalNumber: number) {
  return (octalNumber % 4) - 1 > 0;
}
