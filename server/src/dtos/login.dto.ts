import { Column, Entity } from "typeorm";

@Entity()
export class LoginUserDto{
    @Column()
    user:string;

    @Column()
    password:string;
}