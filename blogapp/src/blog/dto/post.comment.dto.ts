/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class PostCommentDTO {

    @IsNotEmpty()
    @IsString()
    comment:string;



    
}