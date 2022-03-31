/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity"
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { CommentEntity } from "./comment.entity"

@Entity('Blog')
export class BlogEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @ManyToOne(type=>UserEntity,user=>user.blogs,{eager:false})
    user:UserEntity

    @OneToMany(type=>CommentEntity,comment=>comment.blog,{eager:true})
    comments:CommentEntity[];

    @Column()
    tags:string

    @Column()
    like:number

    @Column()
    dislike:number

    @Column()
    userId:number
}