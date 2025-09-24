import db from '@adonisjs/lucid/services/db'
import UserI from '../interfaces/UserI.js'
import User from '#models/user'
import Schedule from '#models/schedule'
import Classroom from '#models/classroom'


export default class UserRepository {



    public trx: any

    public async getSchedule(id: any): Promise<Schedule|any> {
        if (!this.trx) {
            this.trx = await db.transaction()
        }

        let user: User = await User.findOrFail(id, {client: this.trx})

        return new Schedule(user.fullName, user.classrooms)
    }

    public async getUser(id: number): Promise<User> {
        if (!this.trx) {
            this.trx = await db.transaction()
        }
        return await this.trx.from('users').where('id', id).first()
    }
    
    public async deleteUser(id: any) {
        if (!this.trx) {
            this.trx = await db.transaction()
        }
        await this.trx.from('users').where('id', id).delete()
    }

    public async saveUser(newUser: UserI) {
        if (!this.trx) {
            this.trx = await db.transaction()
        }
        await this.trx.insertQuery().table('users').insert(newUser).onConflict('id').merge()
    }

    public async startTransaction() {
        this.trx = await db.transaction()
    }
}