import User from '#models/user'
import vine from '@vinejs/vine'
import { registeredUserValidator } from './RegisteredUserValidator.js'

export const registeredClassroomValidator = vine.compile(
  vine.object({
    id: vine.number(),
    num: vine.number(),
    maxCapacity: vine.number(),
    createdBy: vine.string().trim().minLength(4),
    isAvailable: vine.boolean()
  })
)