import Schedule from "#models/schedule";
import { Request } from "@adonisjs/http-server";
import UserRepository from "../repositories/UserRepository.js";
import UserI from "../interfaces/UserI.js";
import { userValidator } from "#validators/UserValidator";
import { registeredUserValidator } from "#validators/RegisteredUserValidator";
import User from "#models/user";
import ExceptionHandler from "#exceptions/Exception";

export default class UserService {
    userRepository: UserRepository = new UserRepository();

    async edit(request: Request): Promise<Object> {
      try {
        const validated: UserI | any = await request.validateUsing(registeredUserValidator)
        await this.userRepository.saveEditedUser(validated)
        return { status: 200, info: 'User edited successfully' }
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'User not found',
            errors: error["message"],
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error["message"], 
          }
        }

      }      
    }

    async getSchedule(student_id: any): Promise<Schedule|Object> {
      try {
        const schedule: Schedule = await this.userRepository.getSchedule(student_id)
        return { status: 200, info: "Schedule found", data : schedule }
      } catch (error) {
        if (error.message === "404" || error.status === 404) {
          return {
            message: 'Schedule not found',
            errors: error["message"],
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error["message"], 
          }
        }

      }
    }

    async profile(id: any): Promise<User|Object> {
      try {
        const user: User|null = await this.userRepository.getUser(id)
        if (user === null) {
          return {
            error: new ExceptionHandler(404, "User not found")
          }
        }
        return { status: 200, info: 'User profile found', data: user }
      } catch (error) {
        return {
            message: 'Unknow error',
            errors: error["message"], 
        }
      }
    }

    async delete(id: any): Promise<Object> {
      try {
        await this.userRepository.deleteUser(id)
        return { status: 200, info: 'User deleted successfully' }
      } catch (error) {
        return {
          status: 500,
          message: 'Unknow error',
          errors: error["message"], 
        }
      }
    }

    async register(request: Request): Promise<Object> {
      try {
        const validated: UserI | any = await request.validateUsing(userValidator)
      
        const user: User = await this.userRepository.saveUser(validated)
        return { status: 200, info: 'User registered successfully', userId: user.id }
      } catch (error) {
        if (error.status === 422) {
          return {
            message: 'Invalid user data',
            errors: error["message"],
          }
        } else {
          return {
            message: 'Unknow error',
            errors: error["message"], 
          }
        }

      }
    }

}