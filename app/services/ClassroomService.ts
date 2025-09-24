import Classroom from "#models/classroom";
import User from "#models/user";
import { Request } from "@adonisjs/http-server";
import ClassroomRepository from "../repositories/ClassroomRepository.js";


export default class ClassroomService {
    repository: ClassroomRepository = new ClassroomRepository();

    async getAllStudentsFromClassroom(id: any): Promise<User[]|Object> {
      try {
        let students = await this.repository.getAllStudents(id)
        return students
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'Students not found',
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
    
    async removeStudentFromClassroom(student_id: any, classroom_id: any): Promise<Object> {
        throw new Error("Method not implemented.");
    }
    async addStudentToClassroom(student_id: any, classroom_id: any): Promise<Object> {
        throw new Error("Method not implemented.");
    }
    async getClassroom(id: any): Promise<Classroom> {
        throw new Error("Method not implemented.");
    }
    async deleteClassroom(id: any): Promise<Object> {
        throw new Error("Method not implemented.");
    }
    async editClassroom(request: Request): Promise<Object> {
        throw new Error("Method not implemented.");
    }
    async createClassroom(request: Request): Promise<Object> {
        throw new Error("Method not implemented.");
    }
    
}