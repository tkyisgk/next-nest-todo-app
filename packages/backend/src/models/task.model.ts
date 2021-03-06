import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { UserModel } from "@/models/user.model";

@ObjectType()
@Entity("task")
export class TaskModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column("datetime")
  deadline: Date;

  @Field(() => UserModel, { nullable: false })
  @ManyToOne(() => UserModel, (user) => user.tasks)
  assign: UserModel;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
