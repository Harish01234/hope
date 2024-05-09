import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import axios, { AxiosError } from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JsonObject } from 'next-auth/adapters';
import dbConnect from '@/lib/dbconnect';
import { User } from '@/model/User';


function page() {

  const signuphandler=async(formdata:FormData)=>{
    "use server"
    const username=formdata.get('username') as string | undefined
    const password=formdata.get('password') as string | undefined
     const email=formdata.get('email') as string | undefined

     if(!username || !password || !email){
        throw new Error("plz provide all the fields")
     }
     dbConnect()   

    const exituser=await User.findOne({email})
    if(exituser){
        throw new Error("user already exits")

    } 
    const user=new User(
        {
            username,
            email,
            password
        }
    )
    console.log(user);
    

    await user.save();

  }

  return (
    <Card >
      
      <div className='flex justify-center item-center h-dvh mt-20 mb-40 '>
      
       

      
        <form action={
          
          signuphandler} className='flex flex-col gap-4'>
          
          <Input type='username' placeholder='username' name='username' />
          <Input type='email' placeholder='email' name='email' />
          <Input type='password' placeholder='password' name='password' />
          <Button type='submit' variant={'default'}>signup</Button>


        </form>
      </div>
    </Card>
  )
}

export default page