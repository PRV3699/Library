/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchBlogDto } from "./dto/search.blog.dto";
import { SigninDto } from "./dto/signin.credentials.dto";
import { SignUpDto } from "./dto/signup.crdentials.dto";
import { JwtPayload } from "./jwt.payload";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository) private userRepository:UserRepository,
        private jwtService:JwtService
    ){}
    async signup(signupdto:SignUpDto){
        await this.userRepository.signup(signupdto)
    }
    async getmyuser(searchblogdto:SearchBlogDto,user:UserEntity){
        return this.userRepository.getmyuser(searchblogdto,user)
    }

    async signin(signindto:SigninDto){
        const user=await this.userRepository.signin(signindto)
        if(!user){
            throw new NotFoundException(`User not found`)
        }
        const payload:JwtPayload={email:signindto.email,id:user.id};
        const token=await this.jwtService.sign(payload)
        return {token:token,id:user.id}
    }
    async postprofile(id:string,signupdto:SignUpDto){
        await this.userRepository.postprofile(id,signupdto)
    }
}