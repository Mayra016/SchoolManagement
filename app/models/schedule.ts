import Classroom from "./classroom.js"


export default class Schedule {
    declare studentName: string

    declare classrooms: Classroom[]

    constructor(name: string, classrooms: Classroom[]) {
        this.studentName = name
        this.classrooms = classrooms
    }
}