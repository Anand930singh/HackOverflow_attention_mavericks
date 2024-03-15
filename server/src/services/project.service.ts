import { Repository } from "typeorm";
import { Projects } from "../entities/Project";
import { AddProjectDto } from "../dtos/addProject.dto";
import { AppSataSource } from "..";

export class ProjectSevice{
    private static projectRepository:Repository<Projects>;

    static async addProject(body:AddProjectDto):Promise<any>{
        const myDataSource= AppSataSource;
        const userRepository=myDataSource.getRepository(Projects);
        const project = userRepository.create(body)
        return userRepository.save(body);
    }

    static async getProjects():Promise<any>{
        const myDataSource= AppSataSource;
        const projects = await myDataSource.getRepository(Projects).find();
        return projects;
    }

    static async getProjectById(id:string):Promise<any>{
        const myDataSource = AppSataSource;
        const userRepository= myDataSource.getRepository(Projects);
        const project = userRepository.findOne({ where: { id: id } });
        return project;
    }
}