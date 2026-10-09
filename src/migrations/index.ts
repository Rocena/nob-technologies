import * as migration_20261009_084959_init from './20261009_084959_init';

export const migrations = [
  {
    up: migration_20261009_084959_init.up,
    down: migration_20261009_084959_init.down,
    name: '20261009_084959_init'
  },
];
