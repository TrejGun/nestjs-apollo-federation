import { Injectable } from "@nestjs/common";

import { ITest } from "./interfaces";

const list = [
  {
    id: 1,
    letter: "a",
  },
  {
    id: 2,
    letter: "b",
  },
  {
    id: 3,
    letter: "c",
  },
];

@Injectable()
export class TestService {
  public testMethod(id: number): ITest | void {
    return list.find(item => item.id === id);
  }
}
