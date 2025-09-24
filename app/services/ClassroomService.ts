import Classroom from "#models/classroom";
import User from "#models/user";
import { Request } from "@adonisjs/http-server";
import { userValidator } from "#validators/UserValidator";
import ClassroomRepository from "../repositories/ClassroomRepository.js";
import ClassroomI from "../interfaces/ClassroomI.js";


export default class ClassroomService {
    repository: ClassroomRepository = new ClassroomRepository();

    async getAllStudentsFromClassroom(id: number): Promise<User[]|Object> {
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

    async removeStudentFromClassroom(student_id: string, classroom_id: any): Promise<Object> {
      try {
        await this.repository.removeStudentFromClassroom(student_id, classroom_id)
        return {message: 'Student were successful removed from classroom'}
      } catch (error) {
        if (error.status === 404) {
          return {
            message: 'Not found',
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

    async addStudentToClassroom(professor_id: string, student_id: string, classroom_id: any): Promise<Object> {
        try {
            const classroom: Classroom|Object = this.repository.getClassroom(classroom_id)

            if (classroom instanceof Classroom) {
                if (classroom.createdBy !== professor_id) {
                    return {message: "You can't add a student to a classroom that you have not created"}
                }
                const isStudentAlreadyIn = classroom.students.find((x: User) => x.id === student_id)

                if (isStudentAlreadyIn) {
                    return {message: 'User already in this classroom'}
                }

                if (!classroom.isAvailable) {
                    return {message: 'This classroom is not available'}
                }

                if (classroom.students.length < classroom.maxCapacity) {
                    this.repository.addStudentToClassroom(classroom, student_id)
            
                    return {message: 'Student were successful added to classroom'}
                } else {
                    return {message: 'Max capaciy reached'}
                }
            } else {
                return {message: 'Error adding student to classroom'}
            }
            
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async getClassroom(id: any): Promise<Classroom|Object> {
        try {
            const classroom: Classroom = await this.repository.getClassroom(id)
            return classroom
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async deleteClassroom(id: any): Promise<Object> {
        try {
            await this.repository.deleteClassroom(id)
            return {message: 'Classroom was successful deleted'}
          } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async editClassroom(request: Request): Promise<Object> {
        try {
            const validated: ClassroomI | any = await request.validateUsing(userValidator)
            await this.repository.editClassroom(validated)
            return {message: 'Classroom was successful edited'}
        } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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
    async createClassroom(request: Request): Promise<Object> {
        try {
            const validated: ClassroomI | any = await request.validateUsing(userValidator)
            await this.repository.createClassroom(validated)
            return {message: 'Classroom was successful created'}
        } catch (error) {
            if (error.status === 404) {
              return {
                message: 'Not found',
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