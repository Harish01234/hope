import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn } from '@/auth'

function page() {

  const signinhandler = async (formdata: FormData) => {
    "use server"
    const password = formdata.get('password') as string | undefined
    const email = formdata.get('email') as string | undefined
    console.log(password, email);

    if (!email || !password) {
      throw new Error("plz provide all the fields")
    }


    try {
      await signIn('credentials',{
          email,
          password,
          redirect:false
          
          

      })
      
      

  } catch (error:any) {
      throw new Error("problem in signin")
  }    
  }


  return (
    <Card >

      <div className='flex justify-center item-center h-dvh mt-20 mb-40 '>




        <form action={signinhandler} className='flex flex-col gap-4'>

          <Input type='email' placeholder='email' name='email' />
          <Input type='password' placeholder='password' name='password' />
          <Button type='submit' variant={'default'}>login</Button>


        </form>
      </div>
    </Card>
  )
}

export default page