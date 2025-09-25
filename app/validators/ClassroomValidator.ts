import vine from '@vinejs/vine'

export const classroomValidator = vine.compile(
  vine.object({
    num: vine.number(),
    maxCapacity: vine.number(),
    createdBy: vine.string().trim().minLength(4),
  })
)