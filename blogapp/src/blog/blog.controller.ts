/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { BlogEntity } from './blog.entity';
import { BlogLD } from './blog.enum';
import { BlogService } from './blog.service';
import { CreateBlogDTO } from './dto/create.blog.dto';
import { LikeDisDto } from './dto/likedis.blog.dto';
import { PostCommentDTO } from './dto/post.comment.dto';
import { SearchBlogDto } from './dto/search.blog.dto';
import { GetBlog } from './get.blog.decorator';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
    constructor(private blogService:BlogService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createBlog(@Body() createBlogdto:CreateBlogDTO,@GetUser() user:UserEntity){
        return this.blogService.createBlog(createBlogdto,user)
    }
    
    @Get() 
    getBlog(@GetUser() user:UserEntity,@Query() searchBlogdto:SearchBlogDto) {
        return this.blogService.getBlog(searchBlogdto,user);
    }

   /* @Get('/comment') 
    getComments(@GetUser() user:UserEntity,@GetBlog() blog:BlogEntity,@Query() searchBlogdto:SearchBlogDto) {
        return this.blogService.getComments(searchBlogdto,blog,user);
    }*/

    @Get('/comment')
    @UseGuards(AuthGuard())
    getfullblog(@GetBlog() blogs:BlogEntity,@GetUser() user:UserEntity){
        return user.blogs
    }
    

    @Patch('/:id')
    updateBlog(@GetUser() user:UserEntity,@Param('id') id:string,@Body() createBlogdto:CreateBlogDTO) {
        return this.blogService.updateBlog(id,createBlogdto);
    }

    @Patch('/:id/:LD')
    updateBlogLD(@GetUser() user:UserEntity,@Param('id') id:string, @Param('LD') LD:BlogLD) {
        return this.blogService.updateBlogLD(id,LD);
    }
    
    @Delete('/:id')
    deleteBlog(@GetUser() user:UserEntity,@Param('id') id:string) {
        return this.blogService.deleteBlog(id)
    }

    @Post('/comment/:id')
    @UsePipes(ValidationPipe)
    async postComment(@Body() postcommentdto:PostCommentDTO,@GetUser() user:UserEntity,@GetBlog() blog:BlogEntity,@Param('id') id:string){
        return this.blogService.postComment(postcommentdto,user,blog,id)
    }
}
