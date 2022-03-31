/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm"
import { SignUpDto } from "./dto/signup.crdentials.dto";
import { UserEntity } from "./user.entity";
import * as crypto from "crypto-js"
import { SigninDto } from "./dto/signin.credentials.dto";
import { NotFoundException } from "@nestjs/common";
import { SearchBlogDto } from "./dto/search.blog.dto";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity>{
    async signup(signupdto:SignUpDto){
        const user=new UserEntity()
        user.firstname=signupdto.firstname
        user.lastname=signupdto.lastname
        user.email=signupdto.email
        user.password=`${crypto.MD5(signupdto.password)}`;
        await user.save()
    }
    async getmyuser(searchblogdto:SearchBlogDto,user:UserEntity){
        const {search}=searchblogdto
        const query=this.createQueryBuilder('user')
        if(search){
            query.andWhere(
                `(user.email LIKE :search) `,
                {search:`%${search}%`}
            )
        }
        query.andWhere(`user.id=:userId`,{userId:user.id})
        return await query.getMany()
    }
    async signin(signindto:SigninDto){
        const {email,password}=signindto
        const user=await this.findOne({email:email})
         if(user && user.validatePassword(password)){
             return user
         }
         return null
    }
    async  getTaskbyId(id:string){
        //select * from task where id=id
        const user=await this.findOne(id);
        if(!user){
            throw new NotFoundException(`task not found`)
        }
        return user;
        /*const task=this.tasks.find((task)=>{
            return task.id==id;
        });
        if(!task){
            throw new NotFoundException('task not found');
        }
        return task;*/
    }
    async postprofile(id:string,signupdto:SignUpDto){
        const user=await this.getTaskbyId(id)
        user.firstname=signupdto.firstname
        user.lastname=signupdto.lastname
        user.email=signupdto.email
        user.password=`${crypto.MD5(signupdto.password)}`;
        user.city=signupdto.city
        user.state=signupdto.state
        user.country=signupdto.country
        user.pincode=signupdto.pincode
        user.birthdate=signupdto.birthdate
        user.gender=signupdto.gender
        await user.save()
    }
}


