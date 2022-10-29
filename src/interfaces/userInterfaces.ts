import { Request } from "express"

export interface customUser extends Request{
    body:{
        clientID: number
        fullName:string
        userName:string
        email:string
        phoneNumber:string
        lat:number
        lng:number
        password:string
    }
}

export interface User{
    fullName:string
    userName:string
    email:string
    phoneNumber:string
    location:string
    password:string
    lat:number
    lng:number
    role:string,
    iat:number,
    exp:number
}