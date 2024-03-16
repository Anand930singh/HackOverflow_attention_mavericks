import { Repository } from "typeorm";
import { ProjectUpdate } from "../entities/ProjectUpdate";
import { AddProjUpdateDto } from "../dtos/addProjUpdate.dto";
import { AppSataSource } from "..";

export class UpdateProj{
    private static projectRepository:Repository<ProjectUpdate>

    static async addUpdateProj(body: AddProjUpdateDto):Promise<any>{
        const myDataSource = AppSataSource;
        const updateProjRepository = myDataSource.getRepository(ProjectUpdate)
        const savedUpdate = await updateProjRepository.create(body);
        return updateProjRepository.save(savedUpdate);
    }

    static async getUpdateById(id:string):Promise<any>{
        const myDataSource = AppSataSource;
        const updateProjRepository = myDataSource.getRepository(ProjectUpdate);
        const updates= await updateProjRepository.find({where:{projectId:id},order: {
            createdon: "DESC"
          }});
          return updates
    }
    
}