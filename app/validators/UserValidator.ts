import vine from '@vinejs/vine'
import { Role } from '../enums/roles.js'

export const userValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(4).maxLength(256),
    contents: vine.string().trim(),
    fullName: vine.string().trim().minLength(4).maxLength(30),
    email: vine.string().trim().minLength(4).maxLength(30),
    password: vine.string().trim().minLength(8).maxLength(20),
    role: vine.enum(Role),
    registration: vine.number(),
    birthday: vine.date()
  })
)