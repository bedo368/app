import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { handleDatabaseError } from "src/utls/handle_database_error";

export const createUserAuthRepo = (dataSource: DataSource) => {
  const baseRepository: Repository<UserEntity> =
    dataSource.getRepository<UserEntity>(UserEntity);
  
  
    return baseRepository.extend({
      async createNewUser(this: Repository<UserEntity> , userName: string , password: string , name: string) {
        const user = new UserEntity();
        user.userName = userName;
        user.password = password;
        user.name = name;
        await this.save(user);
      },
      async getUser(this: Repository<UserEntity> , userName: string) {
        try {
          return await this.findOneOrFail({ where: { userName } });  
        } catch (error) {

          handleDatabaseError(error, 'Failed to fetch user');
          throw new Error('User not found');
        }
      }
    });
  }