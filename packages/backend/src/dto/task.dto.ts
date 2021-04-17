import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class AddTaskInput {
  @Field()
  title: string;

  @Field()
  deadline: Date;

  @Field(() => ID)
  userId: number;
}
