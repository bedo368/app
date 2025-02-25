import { TaskEnetity as TaskEntity } from "src/modules/tasks/entitis/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class UserEntity { 
  @PrimaryGeneratedColumn("uuid")
   id: string ;
   
   @Column({unique:true})
   userName : string ;

   @Column()
   password : string ;

   @Column()
   name : string ;

   @OneToMany(() => TaskEntity, task => task.user, { cascade: true }) 
   tasks : TaskEntity[];

}