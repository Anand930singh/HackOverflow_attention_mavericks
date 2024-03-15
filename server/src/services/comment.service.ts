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
        const comment=new AddComentDto()
        comment.comment=body.comment;
        comment.projectId=body.projectId;
        comment.sentimentScore=body.sentimentScore;
        comment.userid=body.userid;
        const savedComment= await commentRepository.create(comment);

        return commentRepository.save(savedComment);
    }

    static async getCommentsById(id:string):Promise<any>{
        const myDataSource = AppSataSource;
        const commentRepository = myDataSource.getRepository(Comments);
        const project = await commentRepository.find({where:{projectId:id}});
        console.log(project);
        return project;
    }
}