import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../../../entity/User";
import bcrypt from "bcryptjs";
import RegisterInput from "../../types/user/RegisterInput";

@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
