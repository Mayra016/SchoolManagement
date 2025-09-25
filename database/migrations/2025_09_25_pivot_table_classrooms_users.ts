import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ClassroomStudentSchema extends BaseSchema {
  protected tableName = 'classroom_student'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
        table.string('student_id').notNullable() 
        table.integer('classroom_id').notNullable()
        table.primary(['student_id', 'classroom_id'])        
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
