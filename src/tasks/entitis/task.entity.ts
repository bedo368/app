import { TaskStatus } from "src/tasks/task.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEnetity {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column()
  title: string
  @Column()
  description: string
  @Column()
  status: TaskStatus
}