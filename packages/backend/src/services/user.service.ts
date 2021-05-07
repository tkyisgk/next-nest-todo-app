import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserModel } from "@/models/user.model";
import { AddUserInput } from "@/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private usersRepository: Repository<UserModel>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return this.usersRepository.find({
      relations: ["tasks"],
      order: {
        id: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<UserModel> {
    return await this.usersRepository.findOne(id);
  }

  async add(obj: AddUserInput): Promise<UserModel> {
    return await this.usersRepository.save(obj);
  }

  async remove(id: number): Promise<UserModel> {
    await this.usersRepository.delete(id);
    return await this.findOne(id);
  }
}
