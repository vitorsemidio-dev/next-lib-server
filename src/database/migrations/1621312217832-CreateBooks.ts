/** @format */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooks1621312217832 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'books',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						generationStrategy: 'uuid',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'varchar',
						isUnique: true,
					},
					{
						name: 'slug',
						type: 'varchar',
					},
					{
						name: 'author',
						type: 'varchar',
					},
					{
						name: 'pages',
						type: 'integer',
					},
					{
						name: 'picture',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'timestamp',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('books');
	}
}
