import Classroom from '#models/classroom'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'

export default class ClassroomRepository {
    public trx: any

    public async addStudentToClassroom(student_id: any, classroom_id: any) {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', classroom_id).preload('students').firstOrFail()
        const user: User = await User.query().where('id', student_id).firstOrFail()

        await classroom.related('students').attach([user])
    }

    public async removeStudentFromClassroom(student_id: any, classroom_id: any) {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', classroom_id).preload('students').firstOrFail()
        await classroom.related('students').detach([student_id])
    }

    public async getAllStudents(id: any) {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()

        return classroom.students
    }

    public async startIfNotPresent() {
        if (!this.trx) {
            this.startTransaction()
        }
    }

    public async startTransaction() {
        this.trx = await db.transaction()
    }
}