/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddLibraryIdToBooks1621353772634 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
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
				referencedTableName: 'books',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('books', 'BookLibrary');
		await queryRunner.dropColumn('books', 'library_id');
	}
}
