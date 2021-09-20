import { Args, Int, Query, Resolver } from "@nestjs/graphql";

import { TestType } from "./types";
import { TestService } from "./test.service";
import { ITest } from "./interfaces";

@Resolver(() => TestType)
export class TestResolver {
  constructor(private readonly testService: TestService) {}

  @Query(() => TestType)
  public test(@Args("id", { type: () => Int }) id: number): ITest | void {
    return this.testService.testMethod(id);
  }
}
