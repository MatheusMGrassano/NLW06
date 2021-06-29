import { Request, Response } from "express";
import { ListUserSenderComplimentsService } from "../services/ListUserSendComplimentsService";


class ListUserSenderComplimentsController{
    async handle(request:Request, response:Response){
        const {user_id} = request

        const listUserSendComplimentsService = new ListUserSenderComplimentsService();

        const compliments = await listUserSendComplimentsService.execute(user_id)

        return response.json(compliments)
    }
}

export {ListUserSenderComplimentsController}