import db from '@adonisjs/lucid/services/db'
import UserI from '../interfaces/UserI.js'
import User from '#models/user'
import Schedule from '#models/schedule'
import { DateTime } from 'luxon'
import ScheduleI from '../interfaces/ScheduleI.js'
import ExceptionHandler from '#exceptions/Exception'

export default class UserRepository {

    public trx: any

    public async getSchedule(id: string): Promise<Schedule|any> {
        let transactionStarted = false;
        
        try {
            if (!this.trx) {
                this.trx = await db.transaction()
            }

            transactionStarted = true 

            const user = await User.query().where('id', id).preload('classrooms').first()

            if (!user) throw new ExceptionHandler(404, 'Student not found')
        

            let classroomInfos: ScheduleI[] = []
            
            for (let i = 0; i < user.classrooms.length; i++) {
                const professor = await User.query().where('id', user.classrooms[i].createdBy).first()
                
                if (!professor)  throw new ExceptionHandler(404, 'Professor not found')

                const classroominfo: ScheduleI = {
                    professorName: professor.fullName,
                    classroomNum: user.classrooms[i].num
                }

                classroomInfos.push(classroominfo)
            }

            if (transactionStarted) {
                await this.trx.commit()
            }

            return new Schedule(user.fullName, classroomInfos)
        }
        catch(error) {
            if (this.trx && transactionStarted) {
                await this.trx.rollback();
            }
            throw error;
        }

    }

    public async getUser(id: number): Promise<User|null> {
        return await User.find(id)
    }
    
    public async deleteUser(id: any) {
        let transactionStarted = false;
        
        try {
            if (!this.trx) {
                this.trx = await db.transaction();
                transactionStarted = true;
            }
            if (!this.trx) {
               
                this.trx = await db.transaction()
            }
            await User.query().where('id', id).delete()

            if (transactionStarted) {
                await this.trx.commit();
            }

        }
        catch(error) {
            if (this.trx && transactionStarted) {
                await this.trx.rollback();
            }
            throw error;
        }
    }

    public async saveEditedUser(oldUser: UserI) {
        let transactionStarted = false;
      
        try {
          if (!this.trx) {
            this.trx = await db.transaction();
            transactionStarted = true;
          }
      
          let birthday
          if (oldUser.birthday) {
            const dt = DateTime.fromISO(oldUser.birthday)
            birthday = dt.isValid ? dt.toSQLDate() : undefined
          }
      
          let user: User
      
          if (oldUser.id) {
            user = await User.query().where('id', oldUser.id).firstOrFail()
      
            user.fullName = oldUser.fullName
            user.email = oldUser.email
            user.password = oldUser.password
            user.birthday = birthday === undefined ? "" : birthday
            user.role = oldUser.role
      
            await user.useTransaction(this.trx).save()

            if (transactionStarted) {
                await this.trx.commit()
            }

            return user
        }
        } catch (error) {
          if (this.trx && transactionStarted) {
            await this.trx.rollback()
          }
          throw error
        }
      }

    public async saveUser(newUser: UserI): Promise<User> {
        let transactionStarted = false;
      
        try {
          if (!this.trx) {
            this.trx = await db.transaction();
            transactionStarted = true;
          }
      
          let birthday
          if (newUser.birthday) {
            const dt = DateTime.fromISO(newUser.birthday)
            birthday = dt.isValid ? dt.toSQLDate() : undefined
          }

          let user: User = await User.create({
              fullName: newUser.fullName,
              email: newUser.email,
              password: newUser.password,
              birthday: birthday,
              role: newUser.role,
            }, { client: this.trx });
      
          if (transactionStarted) {
            await this.trx.commit()
          }
      
          return user
        } catch (error) {
          if (this.trx && transactionStarted) {
            await this.trx.rollback()
          }
          throw error
        }
    }
      

    public async startTransaction() {
        this.trx = await db.transaction()
    }
}