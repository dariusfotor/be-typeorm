import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBooks1646899814224 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'author',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'firstEdition',
            type: 'timestamp',
          },
          {
            name: 'originalName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'genres',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'startReadDate',
            type: 'timestamp',
          },
          {
            name: 'endReadDate',
            type: 'timestamp',
          },
          {
            name: 'photo',
            type: 'varchar',
            length: '2048',
            isNullable: false,
          },
          {
            name: 'evaluation',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'numberOfPages',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'publishHouse',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await _queryRunner.createForeignKey(
      'books',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
