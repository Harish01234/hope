import dbConnect from "@/lib/dbconnect";
import { User } from "@/model/User";

export async function POST(request: Request) {
await dbConnect()
try {

    const { username, email, password } = await request.json();
    const newUser = new User({
        username,
        email,
        password}
        
    )

    await newUser.save();

    
    return Response.json(
        {
          success: true,
          message: 'User registered successfully. Please verify your account.',
        },
        { status: 201 }
      ); 
    
} catch (error:any) {
    throw new Error(error)
    return Response.json(
        {
            success: false,
            message: 'Error registering user',
        },
        { status: 500 }
    );
}


}