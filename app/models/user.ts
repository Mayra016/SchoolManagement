import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeCreate, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { Role } from '../enums/roles.js'
import Classroom from './classroom.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare registration: number

  @column.dateTime()
  declare birthday: DateTime

  @column()
  declare role: Role

  @manyToMany(() => Classroom, {
    pivotTable: 'classroom_student',
    pivotForeignKey: 'student_id',
    pivotRelatedForeignKey: 'classroom_id',
  })
  public classrooms: Classroom[]|any


  @beforeCreate()
  public static assignRegistration(user: User) {
    user.registration = Math.floor(Math.random() * 1000000)
  }
}