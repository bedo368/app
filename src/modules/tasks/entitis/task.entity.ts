import { TaskStatus } from "src/modules/tasks/task.model";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {UserEntity} from "src/modules/auth/entities/user.entity"
@Entity()
export class TaskEnetity  {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column()
  title: string
  @Column()
  description: string
  @Column()
  status: TaskStatus


  @ManyToMany(()=>UserEntity , user => user.tasks)
  user: UserEntity; 


}