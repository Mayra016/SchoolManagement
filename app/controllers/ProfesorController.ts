import Schedule from "#models/classroom";
import User from "#models/user";
import ClassroomService from "#services/ClassroomService";
import UserService from "#services/UserService";
import { HttpContext } from "@adonisjs/core/http";


export default class ProfesorController {

    userService: UserService = new UserService();
    classroomService: ClassroomService = new ClassroomService();

    public async edit({ request, response }: HttpContext) {
      try {
        await this.userService.edit(request)
        return response.status(200).json({
          message: 'Success editing user',
        })
      }
      catch(e: any) {
        return response.status(500).json({
          message: 'Error editing user: ' + request.id,
        })
      }
    }
    
    public async createClassroom({ request, response }: HttpContext) {
        try {
          await this.classroomService.createClassroom(request)
          return response.status(200).json({
            message: 'Success creating clasroom',
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error creating clasroom: ' + request.id,
            error: e.message,
          })
        }
    }
    
    public async editClassroom({ request, response }: HttpContext) {
      try {
        await this.classroomService.editClassroom(request)
        return response.status(200).json({
          message: 'Success editing classroom',
        })
      }
      catch(e: any) {
        return response.status(500).json({
          message: 'Error editing classroom: ' + request.id,
          error: e.message,
        })
      }
    }

    public async deleteClassroom({ params, response }: HttpContext) {
        try {
          await this.classroomService.deleteClassroom(params.id)
          return response.status(200).json({
            message: 'Success deleting classroom',
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error deleting classroom: ' + params.id,
            error: e.message,
          })
        }
    }

    public async getClassroom({ params, response }: HttpContext) {
        try {
          let classroom: Schedule = await this.classroomService.getClassroom(params.id)
          return response.status(200).json({
            classroom,
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error getting classroom: ' + params.id,
            error: e.message,
          })
        }
    }


    public async addStudentToClassroom({ params, response }: HttpContext) {
        try {
          await this.classroomService.addStudentToClassroom(params.student_id, params.classroom_id)
          return response.status(200).json({
            message: 'Success adding user: ' + params.student_id + ' in the classroom: ' + params.classroom_id,
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error adding user: ' + params.student_id + ' in the classroom: ' + params.classroom_id,
            error: e.message,
          })
        }
    }

    public async removeStudentFromClassroom({ params, response }: HttpContext) {
        try {
          await this.classroomService.removeStudentFromClassroom(params.student_id, params.classroom_id)
          return response.status(200).json({
            message: 'Success removing user: ' + params.student_id + ' in the classroom: ' + params.classroom_id,
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error removing user: ' + params.student_id + ' in the classroom: ' + params.classroom_id,
            error: e.message,
          })
        }
    }

    public async getAllStudentsFromClassroom({ params, response }: HttpContext) {
        try {
          let students: User[] = await this.classroomService.getAllStudentsFromClassroom(params.id)
          return response.status(200).json({
            students,
          })
        }
        catch(e: any) {
          return response.status(500).json({
            message: 'Error getting all users from the classroom: ' + params.id,
            error: e.message,
          })
        }
    }
}