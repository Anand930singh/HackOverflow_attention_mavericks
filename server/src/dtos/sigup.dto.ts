import { Column, Entity } from "typeorm";

@Entity()
export class UserRegistrationDto{
    @Column()
    user:string;

    @Column()
    password:string;

    @Column()
    type:number;
}