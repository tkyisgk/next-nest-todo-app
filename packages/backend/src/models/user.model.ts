import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { TaskModel } from "@/models/task.model";

@ObjectType()
@Entity("user")
export class UserModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => [TaskModel], { defaultValue: [] })
  @OneToMany(() => TaskModel, (task) => task.assign)
  readonly tasks: TaskModel[];
}
