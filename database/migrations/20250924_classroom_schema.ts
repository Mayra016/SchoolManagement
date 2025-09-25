import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ClassroomSchema extends BaseSchema {
  protected tableName = 'classrooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('num').notNullable()
      table.integer('max_capacity').notNullable()
      table.boolean('is_available').notNullable()
      table.string('created_by').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
