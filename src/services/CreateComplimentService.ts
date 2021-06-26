import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;

}

class CreateComplimentService{

    async execute({user_sender, user_receiver, tag_id, message} : IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)
        const tagsRepositories = getCustomRepository(TagsRepositories)

        
        
        if(!user_sender){
            throw new Error("User sender required")
        }

        if(!user_receiver){
            throw new Error("User receiver required")
        }

        if(!tag_id){
            throw new Error("Tag required")
        }

        if(user_sender === user_receiver){
            throw new Error("User is not allowed to compliment himself")
        }

        const userSender = await usersRepositories.findOne(user_sender)

        if(!userSender){
            throw new Error("User sender does not exists")
        }

        const userReceiver = await usersRepositories.findOne(user_receiver)

        if(!userReceiver){
            throw new Error("User receiver does not exists")
        }

        const Tag = await tagsRepositories.findOne(tag_id)

        if(!Tag){
            throw new Error("Tag does not exists")
        }



        const compliment = complimentsRepositories.create({
            user_sender,
            user_receiver,
            tag_id,
            message,
        })

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }
