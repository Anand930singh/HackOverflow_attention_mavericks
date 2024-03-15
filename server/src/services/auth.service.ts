import { Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRegistrationDto } from "../dtos/sigup.dto";
import { AppSataSource } from "..";
import bcrypt from "bcryptjs";
import { LoginUserDto } from "../dtos/login.dto";

export class AuthService{
    private static userRepository: Repository<User>

    static async signUp(body:UserRegistrationDto):Promise<any>{
        const myDataSource = AppSataSource;
        const userRepository = myDataSource.getRepository(User)
        const user = userRepository.create(body)
        return userRepository.save(user);
    }

    static async signIn(body:LoginUserDto):Promise<any>{
        const myDataSource=AppSataSource;
        const user= await myDataSource.getRepository(User).findOne({where:{email:body.email}});
        if(user)
        {
          const isMatch = await bcrypt.compare(body.password, user.password);
          if(isMatch){
                if(user.type===body.type){              
                  return{
                      status:200,
                      data:{
                        userId:user.id,
                        type:user.type
                      }
                  }
                }
                else{
                  return {
                    status: 400,
                    data: {
                      message: "User not found",
                    },
                  };
                }
            }
            else{
                return {
                    status: 400,
                    data: {
                      message: "Wrong Password",
                    },
                  };
            }
        } 
        else {
            return {
              status: 400,
              data: {
                message: "User not found",
              },
            };
          }
    }   

}