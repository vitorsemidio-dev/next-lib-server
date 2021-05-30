import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddLibraryIdToStockLibrary1621392052821
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'stock_library',
			new TableColumn({
				name: 'library_id',
				type: 'varchar',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'stock_library',
			new TableForeignKey({
				name: 'StockLibrary_Library',
				columnNames: ['library_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'libraries',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('stock_library', 'StockLibrary_Library');
		await queryRunner.dropColumn('stock_library', 'library_id');
	}
}
