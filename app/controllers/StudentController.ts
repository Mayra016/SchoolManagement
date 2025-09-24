import Schedule from '#models/schedule';
import UserService from '#services/UserService'
import type { HttpContext } from '@adonisjs/core/http'



export default class StudentController {

    userService: UserService = new UserService();

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

    public async getSchedule({ params, response }: HttpContext) {
      try {
        let schedule: Schedule = await this.userService.getSchedule(params.student_id)
        return response.status(200).json({
          schedule
        })       
      }
      catch(e: any) {
        return response.status(500).json({
          message: 'Error getting schedule'
        })
      }
  }
}