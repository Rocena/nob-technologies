import * as migration_20261009_084959_init from './20261009_084959_init';
import * as migration_20261013_153500_sync_columns from './20261013_153500_sync_columns';
import * as migration_20261016_190000_admissions_and_sessions from './20261016_190000_admissions_and_sessions';
import * as migration_20261013_183000_postgres_init from './20261013_183000_postgres_init';
import * as migration_20261019_120000_postgres_sync_users_and_admissions from './20261019_120000_postgres_sync_users_and_admissions';

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
  {
    up: migration_20261016_190000_admissions_and_sessions.up,
    down: migration_20261016_190000_admissions_and_sessions.down,
    name: '20261016_190000_admissions_and_sessions'
  },
];

export const postgresMigrations = [
  {
    up: migration_20261013_183000_postgres_init.up,
    down: migration_20261013_183000_postgres_init.down,
    name: '20261013_183000_postgres_init'
  },
  {
    up: migration_20261019_120000_postgres_sync_users_and_admissions.up,
    down: migration_20261019_120000_postgres_sync_users_and_admissions.down,
    name: '20261019_120000_postgres_sync_users_and_admissions'
  },
];
