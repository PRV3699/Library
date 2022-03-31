/* eslint-disable prettier/prettier */
import { IsNotEmpty, MaxLength, MinLength,IsString,Matches } from "class-validator"
//import { Match } from "./match.decorator";

export class SignUpDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstname: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
   // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    /*@IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('password')
    passwordConfirm: string;*/

    
    city:string

    
    state:string

    
    country:string

    
    pincode:string

    
    birthdate:string

    
    gender:string
}