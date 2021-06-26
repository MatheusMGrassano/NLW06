import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)
        
        const user = await usersRepositories.findOne({
            email
        })
        if(!user){
            throw new Error ("Invalid email/password")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Invalid email/password")
        }

        const token = sign({
            email: user.email
        },
        "7be3c051a59257ee6f8afbc7defcf48e", 
        {
            subject : user.id,
            expiresIn: "1d"
        })
        return token;
    }

}

export { AuthenticateUserService }