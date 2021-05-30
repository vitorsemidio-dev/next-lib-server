import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddBookIdToStockLibrary1621393450160
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'stock_library',
			new TableColumn({
				name: 'book_id',
				type: 'varchar',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'stock_library',
			new TableForeignKey({
				name: 'StockLibrary_Book',
				columnNames: ['book_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'books',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('stock_library', 'StockLibrary_Book');
		await queryRunner.dropColumn('stock_library', 'book_id');
	}
}
