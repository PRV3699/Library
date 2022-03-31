/* eslint-disable prettier/prettier */
import { UserEntity } from "src/user/user.entity"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BlogEntity } from "./blog.entity"

@Entity('Comment')
export class CommentEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    comment:string

    @ManyToOne(type=>UserEntity,user=>user.comments,{eager:false})
    user:UserEntity

    @ManyToOne(type=>BlogEntity,blog=>blog.comments,{eager:false})
    blog:BlogEntity

    @Column()
    blogId:number

    @Column()
    userId:number
}