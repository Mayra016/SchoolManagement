import Schedule from "#models/schedule";
import { Request } from "@adonisjs/http-server";
import UserRepository from "../repositories/UserRepository.js";
import UserI from "../interfaces/UserI.js";
import vine from '@vinejs/vine'
import { userValidator } from "#validators/UserValidator";
import User from "#models/user";

export default class UserService {
    userRepository: UserRepository = new UserRepository();

    async edit(request: Request) {
      try {
        const validated: UserI | any = await request.validateUsing(userValidator)
        await this.userRepository.saveUser(validated)
        return { message: 'User edited successfully' }
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'User not found',
            errors: error.messages,
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error.messages, 
          }
        }

      }      
    }

    async getSchedule(student_id: any): Promise<Schedule> {
      throw new Error('Method not implemented.');
    }

    async profile(id: any): Promise<User|Object> {
      try {
        const user: User = await this.userRepository.getUser(id)
        return user
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'User not found',
            errors: error.messages,
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error.messages, 
          }
        }

      }
    }

    async delete(id: any): Promise<Object> {
      try {
        await this.userRepository.deleteUser(id)
        return { message: 'User deleted successfully' }
      } catch (error) {
        return {
          status: 500,
          message: 'Unknow error',
          errors: error.messages, 
        }
      }
    }

    async register(request: Request): Promise<Object> {
      try {
        const validated: UserI | any = await request.validateUsing(userValidator)
        await this.userRepository.saveUser(validated)
        return { message: 'User registered successfully' }
      } catch (error) {
        if (error.status === 422) {
          return {
            message: 'Invalid user data',
            errors: error.messages,
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error.messages, 
          }
        }

      }
    }

}