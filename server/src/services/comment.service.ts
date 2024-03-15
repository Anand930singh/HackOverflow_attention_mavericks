import { Repository } from "typeorm";
import { Comments } from "../entities/Comments";
import { AddComentDto } from "../dtos/addComent.dto";
import { AppSataSource } from "..";
import { Projects } from "../entities/Project";
import { User } from "../entities/User";

export class CommentService{
    private static commentRepository:Repository<Comments>

    static async addComment(body:AddComentDto):Promise<any>{
        const myDataSource = AppSataSource;
        const commentRepository=myDataSource.getRepository(Comments);
        // const userRepository=myDataSource.getRepository(User);
        // const user =await userRepository.findOne({where:{id:body.userid}})
        const user = await myDataSource.getRepository(User).findOne({
            where: { id: String(body.userid) } 
        });
        console.log(user)
        console.log(body);
        const comment=new AddComentDto()
        comment.comment=body.comment;
        comment.projectId=body.projectId;
        comment.sentimentScore=body.sentimentScore;
        comment.userid=body.userid;
        const savedComment= await commentRepository.save(comment);
        console.log(savedComment)

    }
}