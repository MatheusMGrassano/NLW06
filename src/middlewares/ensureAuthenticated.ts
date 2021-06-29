import { Request, Response, NextFunction, request, response } from "express"
import { NoConnectionOptionError } from "typeorm"
import { verify } from "jsonwebtoken"
 
interface IPayLoad {
    sub: string
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next :NextFunction
){
    // Receber o token
    const authToken = request.headers.authorization

    //Validar se o token esta preenchido

    if(!authToken){
        return response.status(401).json({message: "Token is missing"})
    }

    const token = authToken.replace("Bearer ","")
    
    try{
        //Validar o token
        const { sub } = verify(token, "7be3c051a59257ee6f8afbc7defcf48e") as IPayLoad
    
        
        //Recuperar infos do usuario
        request.user_id = sub

        return next();
    }catch(err) {
        return response.status(401).json({message: "Invalid token"});
    
    }



}