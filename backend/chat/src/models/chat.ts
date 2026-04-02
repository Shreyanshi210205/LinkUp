import mongoose,{Document,Schema} from 'mongoose'

export interface IChat extends Document{
    users:string[]
    latestMessage:{
        text:string;
        sender:string
    }
    createdAt:Date
    updatedAt:Date
}