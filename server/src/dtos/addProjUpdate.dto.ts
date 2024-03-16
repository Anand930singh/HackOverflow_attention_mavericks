import { Column, Entity } from "typeorm";

@Entity()
export class AddProjUpdateDto{
    @Column()
    projectId:string;

    @Column()
    update:string;
}