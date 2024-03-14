import { Column, Entity } from "typeorm";

@Entity()
export class AddProjectDto{
    @Column()
    title:string;

    @Column()
    image:string;

    @Column()
    description:string;

    @Column()
    location:string;

}