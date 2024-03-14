import { Projects } from "../entities/Project";
import { User } from "../entities/User";

const { Entity, Column } = require("typeorm");

@Entity()
export class AddComentDto{
    
    @Column()
    projectId:Projects;

    @Column()
    userid:User;

    @Column()
    sentimentScore:number;

    @Column()
    comment:string;

}