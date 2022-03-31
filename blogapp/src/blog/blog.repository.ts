/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { BlogEntity } from "./blog.entity";
import { CreateBlogDTO } from "./dto/create.blog.dto";
import { SearchBlogDto } from "./dto/search.blog.dto";
import { NotFoundException } from "@nestjs/common";
import { LikeDisDto } from "./dto/likedis.blog.dto";
import { BlogLD } from "./blog.enum";
import { PostCommentDTO } from "./dto/post.comment.dto";
import { CommentEntity } from "./comment.entity";

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity>{
    async getBlog(searchblogdto:SearchBlogDto,user:UserEntity){
        const {search}=searchblogdto
        const query=this.createQueryBuilder('blog')
        if(search){
            query.andWhere(
                `(blog.title LIKE :search) OR (blog.description LIKE :search) OR (blog.tags LIKE :search)`,
                {search:`%${search}%`}
            )
        }
        query.andWhere(`blog.userId=:userId`,{userId:user.id})
        return await query.getMany()
    }
    async getComments(searchblogdto:SearchBlogDto,blog:BlogEntity,user:UserEntity){
        const {search}=searchblogdto
        //const blogs=await this.getBlogbyId(id)
        const query=this.createQueryBuilder('Comment')
        if(search){
            query.andWhere(
                `(Comment.comment LIKE :search) `,
                {search:`%${search}%`}
            )
        }
        query.andWhere(`(Comment.blogId=:blogId) AND (Comment.userID=:userId)` ,{blogId:blog.id,userId:user.id})
        return await query.getMany()
    }
    async createBlog(createBlogdto:CreateBlogDTO,user:UserEntity){
        const blog=new BlogEntity()
        blog.title=createBlogdto.title
        blog.description=createBlogdto.description
        blog.tags=createBlogdto.tags
        blog.user=user
        await blog.save()
        delete blog.user
        return blog
    }
    async  getBlogbyId(id:string){
        const blog=await this.findOne(id);
        if(!blog){
            throw new NotFoundException(`task not found`)
        }
        return blog;
    }
    async updateBlog(id:string,createBlogdto:CreateBlogDTO){
        const blog=await this.getBlogbyId(id)
        //console.log(blog)
        blog.title=createBlogdto.title
        blog.description=createBlogdto.description
        blog.tags=createBlogdto.tags
        await blog.save()
    }
    async updateBlogLD(id:string,LD:BlogLD){
        const blog=await this.getBlogbyId(id)
        
        if(LD=='LIKE'){
            blog.like=blog.like+1
        } else if(LD=='DISLIKE'){
            blog.dislike=blog.dislike+1
        }
        await blog.save()
    }

    async postComment(postcommentdto:PostCommentDTO,user:UserEntity,blog:BlogEntity,id:string){
        const blogs=await this.getBlogbyId(id)
        const comments=new CommentEntity()
        comments.comment=postcommentdto.comment
        comments.user=user
        comments.blogId=blogs.id
        await comments.save()
        delete comments.user
        delete comments.blog
        return comments
    }
}