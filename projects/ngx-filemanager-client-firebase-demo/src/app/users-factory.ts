import { NameUid } from 'ngx-filemanager-client-firebase';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid/v4';

export function MakeUser(name) {
  return {
    name: name,
    uid: uuid()
  };
}

export const $users = new BehaviorSubject<NameUid[]>([
  MakeUser('Jim'),
  MakeUser('Bob'),
  MakeUser('Frank'),
  MakeUser('John')
]);
export const $groups = new BehaviorSubject<NameUid[]>([
  MakeUser('Residents'),
  MakeUser('Managers'),
  MakeUser('Real Estate Agents'),
]);
