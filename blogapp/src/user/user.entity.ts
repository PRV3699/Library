/* eslint-disable prettier/prettier */
import {BaseEntity,Entity,PrimaryGeneratedColumn,Column,Unique, OneToMany} from "typeorm"
import * as crypto from "crypto-js";
import { BlogEntity } from "src/blog/blog.entity";
import { CommentEntity } from "src/blog/comment.entity";

@Entity('User')
@Unique(['email'])
export class UserEntity extends BaseEntity{
   @PrimaryGeneratedColumn()
   id:number 

   @Column()
   firstname:string

   @Column()
   lastname:string

   @Column()
   email:string

   @Column()
   password:string

   @Column()
   city:string

   @Column()
   state:string

   @Column()
   country:string

   @Column()
   pincode:string

   @Column()
   birthdate:string

   @Column()
   gender:string

   @OneToMany(type=>BlogEntity,blog=>blog.user,{eager:true})
   blogs:BlogEntity[];

   validatePassword(password:string){
        const encrypted=`${crypto.MD5(password)}`
        return encrypted==this.password
    }

    @OneToMany(type=>CommentEntity,comment=>comment.user,{eager:true})
    comments:CommentEntity[];

}