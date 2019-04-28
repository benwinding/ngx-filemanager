import { permsQueries } from './permissions-queries';
import { permsFactory } from './permissions.factory';
import { permsCommands } from './permissions-commands';

export const perms = {
  factory: permsFactory,
  commands: permsCommands,
  queries: permsQueries,
};
