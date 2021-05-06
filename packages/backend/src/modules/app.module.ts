import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";

import { UserModule } from "@/modules/user.module";
import { TaskModule } from "@/modules/task.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    TypeOrmModule.forRoot({}),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
