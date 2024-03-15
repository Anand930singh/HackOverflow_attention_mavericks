import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Projects } from "./Project";

@Entity()
export class Comments{
    @PrimaryGeneratedColumn('uuid')
    commentid:string;

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

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdon: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedon: Date;
}