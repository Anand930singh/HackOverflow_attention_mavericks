import express from "express";
import cors from "cors";
import axios from "axios"
import { DataSource } from "typeorm";
import { UserRegistrationDto } from "./dtos/sigup.dto";
import { AuthService } from "./services/auth.service";
import { LoginUserDto } from "./dtos/login.dto";
import { AddProjectDto } from "./dtos/addProject.dto";
import { ProjectSevice } from "./services/project.service";
import { AddComentDto } from "./dtos/addComent.dto";
import { CommentService } from "./services/comment.service";


const app = express();
const PORT = 8050;

app.use(express.json());
app.use(cors())

export const AppSataSource = new DataSource({
    type: "postgres",
    host: "ep-orange-firefly-a5h2qhzd.us-east-2.aws.neon.tech",
    port: 5432,
    username: "HackOverflow_owner",
    password: "2DzAKYTkbSP0",
    database: "HackOverflow",
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ["src/entities/*{.ts,.js}"],
    synchronize: true,
    logging: true,
});

async function connectDB() {
    await AppSataSource.initialize()
        .then(() => {
            console.log("Connected to database");
        })
        .catch((e) => console.log(e));
}

app.post('/auth/signup', async(req,res)=>{
    const userData: UserRegistrationDto = req.body.formData;
    const newUSer = await AuthService.signUp(userData);
    res.json(newUSer);
})

app.post('/auth/signin', async(req,res)=>{
    const userData: LoginUserDto= req.body.formData;
    const newUser = await AuthService.signIn(userData)
    res.json(newUser);
})

app.post('/project/add', async(req,res)=>{
    const body: AddProjectDto= req.body.formData;
    const project = await ProjectSevice.addProject(body)
    res.json(project);
})

app.get('/project/getProjects', async(req,res)=>{
    const project = await ProjectSevice.getProjects();
    res.json(project)
})

app.post('/comments/add',async(req,res)=>{
    const body: AddComentDto=req.body;
    const comment = await CommentService.addComment(body)
    res.json({status:200, message:"SUCCESS"})
})

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Application running on ${PORT}`);
});