/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
	Table,
} from 'typeorm';

export class CreateStockLibrary1621381063880 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'stock_library',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
					},
					{
						name: 'quantity',
						type: 'int',
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
		await queryRunner.dropTable('stock_library');
	}
}
