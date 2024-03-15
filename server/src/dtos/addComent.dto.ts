import { Projects } from "../entities/Project";
import { User } from "../entities/User";

const { Entity, Column } = require("typeorm");

@Entity()
export class AddComentDto{
    
    @Column()
    projectId:string;

    @Column()
    userid:string;

    @Column()
    sentimentScore:number;

    @Column()
    comment:string;

    @Column()
    classification:string;

    @Column()
    classificationTri:number;

}