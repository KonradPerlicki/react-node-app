import { Query, Resolver } from "type-graphql";

@Resolver()
export default class t {
  @Query(() => String)
  async hellos() {
    return "hello";
  }
}