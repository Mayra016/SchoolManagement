import UserService from "#services/UserService";
import { HttpContext } from "@adonisjs/core/http";


export default class Controller {
    userService: UserService = new UserService();

    public async register({ response, request }: HttpContext) {
        try {
            await this.userService.register(request)
            return response.status(200).json({
              message: 'Student registered successfully',
            })
        }
        catch(e: any){
            return response.status(500).json({
              message: 'Error registrating user',
            })
        }
    } 

    public async delete({ response, params }: HttpContext) {
        try {
            await this.userService.delete(params.id);
            return response.status(200).json({
              message: 'Success deleting user',
            })
        }
        catch(e: any) {
            return response.status(500).json({
                message: 'Error deleting user',
              })
        }
        
    }   

    public async profile({ response, params }: HttpContext) {
        try {
            let info: Object = this.userService.profile(params.id);
            return response.status(200).json({
              info
            })
        }
        catch (e: any) {
            return response.status(500).json({
                message: 'Error getting profile',
              })
        }
    }   

}