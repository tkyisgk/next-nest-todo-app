import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TaskModel } from "@/models/task.model";
import { AddTaskInput } from "@/dto/task.dto";

import { UserService } from "@/services/user.service";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private taskRepository: Repository<TaskModel>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<TaskModel[]> {
    return this.taskRepository.find({
      relations: ["user"],
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<TaskModel> {
    return await this.taskRepository.findOne(id);
  }

  async add(obj: AddTaskInput): Promise<TaskModel> {
    const user = await this.userService.findOne(obj.userId);
    return await this.taskRepository.save({ ...obj, assign: user });
  }

  async delete(id: number): Promise<TaskModel> {
    await this.taskRepository.delete(id);
    return await this.findOne(id);
  }
}
