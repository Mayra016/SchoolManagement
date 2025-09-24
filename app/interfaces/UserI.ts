import { DateTime } from "luxon"

export default interface UserI {
    fullName: string
    email: string
    registration: number
    birthday: DateTime
}