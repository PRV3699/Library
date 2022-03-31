/* eslint-disable prettier/prettier */
import { createParamDecorator } from "@nestjs/common";

export const GetBlog=createParamDecorator((data,obj)=>{
    if(obj.args.length>0){
        const request=obj.args[0]
        return request.blog;
    }
    return null
})