/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class SigninDto{
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    email:string

    @IsNotEmpty()
    password:string
}