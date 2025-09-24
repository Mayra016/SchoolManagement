import db from '@adonisjs/lucid/services/db'
import UserI from '../interfaces/UserI.js'


export default class UserRepository {
    public trx: any

    public async registerUser(newUser: UserI) {
        if (!this.trx) {
            this.trx = await db.transaction()
        }
        await this.trx.insertQuery().table('users').insert(newUser)
    }

    public async startTransaction() {
        this.trx = await db.transaction()
    }
}