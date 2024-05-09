import NextAuth from "next-auth"
import Credentialsprovider from "next-auth/providers/credentials"
import email from "next-auth/providers/email"
import Googleprovider from "next-auth/providers/google"
import { User } from "./model/User"

import dbConnect from "./lib/dbconnect"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Googleprovider(
      {
        clientId: process.env.GoogleClientId,
        clientSecret: process.env.GoogleClientsectet
      }
    ),
    Credentialsprovider(
      {

        id: 'credentials',
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials): Promise<any> {

          const email = credentials.email as String | undefined
          const password = credentials.password as String | undefined
          console.log(email, password);
          // connect db here
          await dbConnect()
         try {
           
          if (!email || !password) {
            throw new Error("plz provide both email and password")
          }

          const user = await User.findOne({email})
          if (!user) {
            throw new Error('plz provide a valid email ')
          }
          if(user.password!=password){
            throw new Error('icorrect password')
          }

         
          return user

         } catch (error:any) {
          throw new Error(error)
          
         }



        }
      }
    )
  ],
  pages:{
    signIn:"/sign-in"
  }
})