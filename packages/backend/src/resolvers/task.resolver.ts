import { Inject } from "@nestjs/common";
import { ID, Args, Query, Mutation, Resolver } from "@nestjs/graphql";

import { TaskModel } from "@/models/task.model";
import { TaskService } from "@/services/task.service";
import { AddTaskInput } from "@/dto/task.dto";

@Resolver()
export class TaskResolver {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  @Query(() => [TaskModel])
  async tasks() {
    return await this.taskService.findAll();
  }

  @Query(() => [TaskModel], { nullable: true })
  async taskByTaskIds(@Args("taskIds", { type: () => [ID] }) ids: number[]) {
    return await this.taskService.findByTaskIds(ids);
  }

  @Query(() => TaskModel, { nullable: true })
  async taskByUserId(@Args("userId", { type: () => ID }) id: number) {
    return await this.taskService.findByUserId(id);
  }

  @Mutation(() => TaskModel)
  async addTask(@Args("task") user: AddTaskInput) {
    return await this.taskService.add(user);
  }

  @Mutation(() => TaskModel, { nullable: true })
  async removeTask(@Args("taskId", { type: () => ID }) id: number) {
    return await this.taskService.delete(id);
  }
}
