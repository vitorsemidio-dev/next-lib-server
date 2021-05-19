/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddBookIdToLibraries1621348952713 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'libraries',
			new TableColumn({
				name: 'book_id',
				type: 'varchar',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'libraries',
			new TableForeignKey({
				name: 'LibraryBook',
				columnNames: ['book_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'books',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('libraries', 'LibraryBook');
		await queryRunner.dropColumn('libraries', 'book_id');
	}
}
