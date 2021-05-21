/** @format */

import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddUserIdToRentBooks1621468461604 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'rent_books',
			new TableColumn({
				name: 'user_id',
				type: 'varchar',
			}),
		);

		await queryRunner.createForeignKey(
			'rent_books',
			new TableForeignKey({
				name: 'RentBooks_User',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('rent_books', 'RentBooks_User');
		await queryRunner.dropColumn('rent_books', 'user_id');
	}
}
