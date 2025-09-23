import { column } from '@adonisjs/lucid/orm'

export default class Classroom {
    @column({isPrimary: true})
    declare id: number

    @column()
    declare maxCapacity: number

    @column()
    declare isAvailable: boolean

    @column() 
    declare students: number[]

    @column() 
    declare createdBy: number

}