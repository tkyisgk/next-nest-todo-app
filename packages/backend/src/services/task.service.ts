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
    return await this.taskRepository.find({
      relations: ["assign"], // MEMO: modelで定義しているカラム名
      order: {
        id: "DESC",
      },
    });
  }

  async findByTaskIds(taskIds: number[]): Promise<TaskModel[]> {
    return await this.taskRepository.findByIds(taskIds, {
      relations: ["assign"],
    });
  }

  async findByUserId(userId: number): Promise<TaskModel> {
    return await this.taskRepository.findOne({
      relations: ["assign"],
      where: {
        assign: userId,
      },
      order: {
        id: "DESC",
      },
    });
  }

  async add(obj: AddTaskInput): Promise<TaskModel> {
    const user = await this.userService.findOne(obj.userId);
    return await this.taskRepository.save({ ...obj, assign: user });
  }

  async delete(id: number): Promise<TaskModel> {
    await this.taskRepository.delete(id);
    return await this.taskRepository.findOne(id);
  }
}
