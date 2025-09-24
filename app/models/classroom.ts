import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'

export default class Classroom extends BaseModel {
    @column({isPrimary: true})
    declare id: number

    @column()
    declare num: number

    @column()
    declare maxCapacity: number

    @column()
    declare isAvailable: boolean

    @manyToMany(() => User, {
        pivotTable: 'classroom_student',
        pivotForeignKey: 'classroom_id',
        pivotRelatedForeignKey: 'student_id',
    })
    declare students: any

    @column() 
    declare createdBy: string

}