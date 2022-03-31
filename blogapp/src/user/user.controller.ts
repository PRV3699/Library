/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchBlogDto } from './dto/search.blog.dto';
import { SigninDto } from './dto/signin.credentials.dto';
import { SignUpDto } from './dto/signup.crdentials.dto';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get('/profile')
    @UseGuards(AuthGuard())
    getProfile(@GetUser() user:UserEntity){
        return [user]
    }
    
    // @Get() 
    // getmyuser(@GetUser() user:UserEntity,@Query() searchBlogdto:SearchBlogDto) {
    //     return this.userService.getmyuser(searchBlogdto,user);
    // }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signup(@Body() signupdto:SignUpDto){
       return this.userService.signup(signupdto)
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signin(@Body() signindto:SigninDto){
        return this.userService.signin(signindto)
    }
    
    
    @Patch('/profile/:id')
    @UsePipes(ValidationPipe)
    postprofile(@Param('id') id:string,@Body() signupdto:SignUpDto) {
        return this.userService.postprofile(id,signupdto);
    }
}
