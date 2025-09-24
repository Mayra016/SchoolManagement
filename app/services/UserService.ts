import Schedule from "#models/schedule";
import { Request } from "@adonisjs/http-server";
import UserRepository from "../repositories/UserRepository.js";
import UserI from "../interfaces/UserI.js";
import vine from '@vinejs/vine'
import { userValidator } from "#validators/UserValidator";

export default class UserService {
    userRepository: UserRepository = new UserRepository();

    edit(request: Request) {
      
    }

    async getSchedule(student_id: any): Promise<Schedule> {
      throw new Error('Method not implemented.');
    }

    profile(id: any): Object {
        throw new Error("Method not implemented.");
    }

    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    async register(request: Request) {
      try {
        const validated: UserI | any = await request.validateUsing(userValidator)
        await this.userRepository.registerUser(validated)
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