const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('../../models');

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Checks migrations and run them if they are not already in the database.
umzug.up().then(() => {
  console.log('Migrations applied successfully.');
  process.exit(0);
}).catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
