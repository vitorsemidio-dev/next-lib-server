const env = require('./src/environment/env');

module.exports = {
	type: env.typeormConnection,
	host: env.typeormHost,
	port: env.typeormPort,
	username: env.typeormUsername,
	password: env.typeormPassword,
	database: env.typeormDatabase,
	synchronize: env.typeormSynchronize,
	logging: env.typeormLogging,
	entities: [env.typeormEntities],
	migrations: [env.typeormMigrations],
	cli: {
		migrationsDir: env.typeormMigrationsDir,
	},
};
