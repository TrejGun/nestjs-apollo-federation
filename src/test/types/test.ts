import { Field, Int, ObjectType } from "@nestjs/graphql";

import { ITest } from "../interfaces";

@ObjectType()
export class TestType implements ITest {
  @Field(_type => Int)
  public id: number;

  @Field()
  public letter: string;
}
