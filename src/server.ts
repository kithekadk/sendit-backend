import express, { json, NextFunction, Request, Response } from 'express'
import userRouter from './routes/userRoutes';
import cors from 'cors'
import parcelRouter from './routes/parcelRoutes';
import mssql from 'mssql';
import { sqlConfig } from './config/config';

const app = express()
app.use(cors())
app.use(json())

app.use('/user', userRouter)
app.use('/parcel', parcelRouter)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({message:err.message})
})

app.listen(4400 ,()=>{
    console.log('Server running on port 4400');
    
})