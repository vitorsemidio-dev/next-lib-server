module.exports = {
	serverPort: process.env.SERVER_PORT || 3333,
	typeormConnection: process.env.TYPEORM_CONNECTION || '',
	typeormHost: process.env.TYPEORM_HOST || 'localhost',
	typeormPort: process.env.TYPEORM_PORT || 5432,
	typeormUsername: process.env.TYPEORM_USERNAME || 'username',
	typeormPassword: process.env.TYPEORM_PASSWORD || 'password',
	typeormDatabase: process.env.TYPEORM_DATABASE || 'database',
	typeormSynchronize: process.env.TYPEORM_SYNCHRONIZE || false,
	typeormLogging: process.env.TYPEORM_LOGGING || false,
	typeormEntities:
		process.env.TYPEORM_ENTITIES || './src/database/entities/*.ts',
	typeormMigrations:
		process.env.TYPEORM_MIGRATIONS || './src/database/migrations/*.ts',
	typeormMigrationsDir:
		process.env.TYPEORM_MIGRATIONS_DIR || './src/database/migrations',
	jwtSecret: process.env.JWT_SECRET || 'jwt',
	jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
