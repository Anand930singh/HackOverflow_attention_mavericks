import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Projects } from "./Project";

@Entity()
export class Comments{
    @PrimaryGeneratedColumn('uuid')
    commentid:string;

    @OneToOne(()=>Projects)
    @JoinColumn()
    projectId:Projects;

    @OneToOne(()=>User)
    @JoinColumn()
    userid:User;

    @Column()
    sentimentScore:number;

    @Column()
    comment:string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdon: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedon: Date;
}