/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddStockLibraryIdToRentBooks1621468781002
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'rent_books',
			new TableColumn({
				name: 'stock_library_id',
				type: 'varchar',
			}),
		);

		await queryRunner.createForeignKey(
			'rent_books',
			new TableForeignKey({
				name: 'RentBooks_StockLibrary',
				columnNames: ['stock_library_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'stock_library',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('rent_books', 'RentBooks_StockLibrary');
		await queryRunner.dropColumn('rent_books', 'stock_library_id');
	}
}
