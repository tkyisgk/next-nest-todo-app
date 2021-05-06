import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AddUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
