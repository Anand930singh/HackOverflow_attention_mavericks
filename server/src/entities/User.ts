import { BeforeInsert, Column } from "typeorm";
import bcrypt from "bcryptjs";
const { Entity, PrimaryGeneratedColumn } = require("typeorm");

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    user:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    type:number;    //0==for normal user , 1==for admin

    @BeforeInsert()
    async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
    
}