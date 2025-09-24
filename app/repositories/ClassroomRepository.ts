import Classroom from '#models/classroom'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import ClassroomI from '../interfaces/ClassroomI.js'

export default class ClassroomRepository {



    public trx: any

    public async editClassroom(validated: ClassroomI) {
        this.startIfNotPresent() 
        await this.trx.insertQuery().table('classroom').insert(validated).onConflict('id').merge()
    }

    public async deleteClassroom(id: number) {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()
        const studentIds: string[] = classroom.students.map((s: User) => s.id)

        await classroom.related('students').detach(studentIds)
    }

    public async getClassroom(id: any): Promise<Classroom|any> {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()
        return classroom
    }

    public async addStudentToClassroom(student_id: string, classroom_id: any) {
        this.startIfNotPresent()

        const classroom: Classroom = await Classroom.query().where('id', classroom_id).preload('students').firstOrFail()

        await classroom.related('students').attach([student_id])
    }

    public async removeStudentFromClassroom(student_id: string, classroom_id: any) {
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