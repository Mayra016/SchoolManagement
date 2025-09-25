import Classroom from '#models/classroom'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import ClassroomI from '../interfaces/ClassroomI.js'

export default class ClassroomRepository {

    public trx: any

    public async createClassroom(validated: ClassroomI) {
       let transactionStarted = false

       try {
            this.startIfNotPresent()
            transactionStarted = true
            const classroom: Classroom = await Classroom.create({
                num: validated.num,
                maxCapacity: validated.maxCapacity,
                createdBy: validated.createdBy               
            })

            if (transactionStarted) {
                await this.trx.commit()
            }

            return classroom
       }
        catch (error) {
            if (this.trx && transactionStarted) {
            await this.trx.rollback()
            }
            throw error
        }
    }


    public async editClassroom(validated: ClassroomI) {
        let transactionStarted = false

        try {
            this.startIfNotPresent()
            transactionStarted = true
            if (validated.id) {
                let classroom: Classroom = await Classroom.query().where('id', validated.id).firstOrFail()
        
                classroom.num = validated.num
                classroom.maxCapacity = validated.maxCapacity
                classroom.isAvailable = validated.isAvailable ? validated.isAvailable : classroom.isAvailable
        
                await classroom.useTransaction(this.trx).save()

                if (transactionStarted) {
                    await this.trx.commit()
                }

                return classroom
            }
        }
        catch (error) {
            if (this.trx && transactionStarted) {
            await this.trx.rollback()
            }
            throw error
        }
    }

    public async deleteClassroom(id: number) {
        let transactionStarted = false

        try {
            this.startIfNotPresent()
            transactionStarted = true 

            const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()
            const studentIds: string[] = classroom.students.map((s: User) => s.id)

            await classroom.related('students').detach(studentIds)

            await Classroom.query().where('id', id).delete()
        
            if (transactionStarted) {
                await this.trx.commit()
            }

            return {message: 'Classroom was successful deleted'}
        }
        catch (error) {
            if (this.trx && transactionStarted) {
                await this.trx.rollback()
            }
            throw error
        }        
            
    }

    public async getClassroom(id: any): Promise<Classroom> {
        let transactionStarted = false

        try {
            this.startIfNotPresent()
            transactionStarted = true

            const classroom: Classroom = await Classroom.query().where('id', id).preload('students').firstOrFail()
            
            if (transactionStarted) {
                await this.trx.commit()
            }

            return classroom
        }
        catch (error) {
            if (this.trx && transactionStarted) {
                await this.trx.rollback()
            }
            throw error
        }  
    }

    public async addStudentToClassroom(classroom: Classroom, student_id: string) {
        this.startIfNotPresent()

        await classroom.related('students').attach([student_id])
        if (classroom.students.length == classroom.maxCapacity) {
            classroom.isAvailable = false            
        }
        await classroom.useTransaction(this.trx).save()
        
    }

    public async removeStudentFromClassroom(student_id: string, classroom_id: number) {
        this.startIfNotPresent()
        
        const classroom: Classroom = await Classroom.query().where('id', classroom_id).preload('students').firstOrFail()
        if (classroom.students.length < classroom.maxCapacity && classroom.isAvailable === false) {
            classroom.isAvailable = true            
        }
        await classroom.related('students').detach([student_id])
    }

    public async getAllStudents(id: number): Promise<User[]|any> {
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