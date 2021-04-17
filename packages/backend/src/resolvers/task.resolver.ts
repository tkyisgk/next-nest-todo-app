import { Inject } from '@nestjs/common';
import { ID, Args, Query, Mutation, Resolver } from '@nestjs/graphql';

import { TaskModel } from '@/models/task.model';
import { TaskService } from '@/services/task.service';
import { AddTaskInput } from '@/dto/task.dto';

@Resolver()
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query(() => [TaskModel])
  async tasks() {
    return await this.taskService.findAll();
  }

  @Query(() => TaskModel)
  async task(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.findOne(id);
  }

  @Mutation(() => TaskModel)
  async addTask(@Args('task') user: AddTaskInput) {
    return await this.taskService.add(user);
  }

  @Mutation(() => TaskModel, { nullable: true })
  async removeTask(@Args('id', { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
