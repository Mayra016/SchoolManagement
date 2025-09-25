import Classroom from "#models/classroom";
import User from "#models/user";
import { Request } from "@adonisjs/http-server";
import { classroomValidator } from "#validators/ClassroomValidator";
import ClassroomRepository from "../repositories/ClassroomRepository.js";
import ClassroomI from "../interfaces/ClassroomI.js";
import { registeredClassroomValidator } from "#validators/RegisteredClassroomValidator";
import ExceptionHandler from "#exceptions/Exception";


export default class ClassroomService {
    repository: ClassroomRepository = new ClassroomRepository();

    async getAllStudentsFromClassroom(id: number): Promise<User[]|Object> {
      try {
        let students = await this.repository.getAllStudents(id)
        return { status: 200, info: 'Students found', data: students }
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'Students not found',
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

    async removeStudentFromClassroom(student_id: string, classroom_id: any): Promise<Object> {
      try {
        await this.repository.removeStudentFromClassroom(student_id, classroom_id)
        return { status: 200, info: 'Student were successful removed from classroom' }
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'Not found',
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

    async addStudentToClassroom(professor_id: string, student_id: string, classroom_id: number): Promise<Object> {
        try {
            const classroom: Classroom = await this.repository.getClassroom(classroom_id)

            if (classroom.num) {
                if (classroom.createdBy !== professor_id) {
                    return {message: new ExceptionHandler(403, "You can't add a student to a classroom that you have not created")}
                }
                const isStudentAlreadyIn = classroom.students.find((x: User) => x.id === student_id)

                if (isStudentAlreadyIn) {
                    return {message: new ExceptionHandler(409, 'User already in this classroom')}
                }

                if (!classroom.isAvailable) {
                    return {message: new ExceptionHandler(403, 'This classroom is not available')}
                }

                if (classroom.students.length < classroom.maxCapacity) {
                    this.repository.addStudentToClassroom(classroom, student_id)
            
                    return { status: 200, info: 'Student were successful added to classroom'}
                } else {
                    return {message: new ExceptionHandler(403, 'Max capaciy reached')}
                }
            } else {
                return {message: new ExceptionHandler(500, 'Error adding student to classroom' + classroom)}
            }
            
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async getClassroom(id: any): Promise<Classroom|Object> {
        try {
            const classroom: Classroom = await this.repository.getClassroom(id)
            return { status: 200, info: 'Classroom found', data: classroom }
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async deleteClassroom(id: any): Promise<Object> {
        try {
            await this.repository.deleteClassroom(id)
            return { status: 200, info: 'Classroom was successful deleted' }
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async editClassroom(request: Request): Promise<Object> {
        try {
            const validated: ClassroomI = await request.validateUsing(registeredClassroomValidator)
            const classroom: Classroom|undefined = await this.repository.editClassroom(validated)
            return { status: 200, info: 'Classroom was successful edited', data: classroom}
        } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async createClassroom(request: Request): Promise<Object> {
        try {
            const validated: ClassroomI | any = await request.validateUsing(classroomValidator)
            const classroom: Classroom|Object = await this.repository.createClassroom(validated)
            return { status: 200, info: 'Classroom was successful created', data: classroom}
        } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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