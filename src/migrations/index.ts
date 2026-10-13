import * as migration_20261009_084959_init from './20261009_084959_init';
import * as migration_20261013_153500_sync_columns from './20261013_153500_sync_columns';

export const migrations = [
  {
    up: migration_20261009_084959_init.up,
    down: migration_20261009_084959_init.down,
    name: '20261009_084959_init'
  },
  {
    up: migration_20261013_153500_sync_columns.up,
    down: migration_20261013_153500_sync_columns.down,
    name: '20261013_153500_sync_columns'
  },
];
