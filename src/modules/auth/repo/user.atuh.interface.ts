import { UserEntity } from "../entities/user.entity";


export interface UserAuthInterface {


  createNewUser(userName: string , password: string , name: string): Promise<void> ;

  getUser(userName: string): Promise<UserEntity> ;
  


}