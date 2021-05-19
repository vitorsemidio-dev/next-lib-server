/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class RemoveForeignKeyFromBookAndLibraryEntities1621399187383
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('books', 'BookLibrary');
		await queryRunner.dropColumn('books', 'library_id');

		await queryRunner.dropForeignKey('libraries', 'LibraryBook');
		await queryRunner.dropColumn('libraries', 'book_id');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'books',
			new TableColumn({
				name: 'library_id',
				type: 'varchar',
				isNullable: true,
			}),
		);

		await queryRunner.createForeignKey(
			'books',
			new TableForeignKey({
				name: 'BookLibrary',
				columnNames: ['library_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'libraries',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);

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
}
