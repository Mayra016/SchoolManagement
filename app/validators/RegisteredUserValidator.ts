import vine from '@vinejs/vine'
import { Role } from '../enums/roles.js'

export const registeredUserValidator = vine.compile(
  vine.object({
    id: vine.string().trim(),
    fullName: vine.string().trim().minLength(4).maxLength(30),
    email: vine.string().email().trim().minLength(4).maxLength(30),
    password: vine.string().trim().minLength(8).maxLength(20),
    role: vine.enum(Role),
    birthday: vine.string().trim(),
    registration: vine.number().optional()
  })
)