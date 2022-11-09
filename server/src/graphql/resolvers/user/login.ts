import { MyContext } from "./../../../types/Context";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import User from "../../../entity/User";
import bcrypt from "bcryptjs";
import LoginInput from "../../types/user/LoginInput";

@Resolver()
export default class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return null;
    }

    ctx.req.session.userId = user.id;

    return user;
  }
}
