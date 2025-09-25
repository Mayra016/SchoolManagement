import { DateTime } from "luxon"
import { Role } from "../enums/roles.js"

export default interface UserI {
    id?: string
    fullName: string
    email: string
    password: string
    registration?: number
    birthday: string
    role: Role
}