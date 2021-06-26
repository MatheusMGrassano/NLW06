import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs"


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean
    password: string;
}

class CreateUserService{

    async execute({ name, email, admin = false, password } : IUserRequest){
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("Email required")
        }

        if(!name){
            throw new Error("Name required")
        }

        if(!password){
            throw new Error("Password required")
        }

        if(password.length < 8 ){
            throw new Error("Minimum 8 characters")
        }

        const userAlreadyExists = await usersRepository.findOne({
            email:email
        })

        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService }