import Classroom from '#models/classroom'
import db from '@adonisjs/lucid/services/db'

export default class ClassroomRepository {

    public trx: any

    public async getAllStudents(id: any) {
        if (!this.trx) {
            this.startTransaction()
        }

        const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()

        return classroom.students
    }

    public async startTransaction() {
        this.trx = await db.transaction()
    }
}