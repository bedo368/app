import { IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto{ 


  @IsString({message: "userName must be a string"})
  @IsNotEmpty({message:"userName is required"})
  userName: string

  @IsNotEmpty({message:"password is required"})
  @IsString({message:"password must be a string"})
  password: string;
}