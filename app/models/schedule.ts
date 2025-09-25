import ScheduleI from "../interfaces/ScheduleI.js"
import Classroom from "./classroom.js"


export default class Schedule {
    declare studentName: string

    declare classrooms: ScheduleI[]

    constructor(name: string, classrooms: ScheduleI[]) {
        this.studentName = name
        this.classrooms = classrooms
    }
}