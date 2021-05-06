import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskModel } from "@/models/task.model";
import { TaskResolver } from "@/resolvers/task.resolver";
import { TaskService } from "@/services/task.service";

import { UserModule } from "@/modules/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel]), forwardRef(() => UserModule)],
  providers: [TaskService, TaskResolver],
  exports: [],
})
export class TaskModule {}
