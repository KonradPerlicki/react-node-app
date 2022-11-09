import { Length, IsEmail, Min } from "class-validator";
import { Field, InputType } from "type-graphql";
import { EmailExist } from "../../middleware/emailExist";

@InputType()
export default class RegisterInput {
  @Field()
  @Length(2, 255)
  firstName: string;

  @Field()
  @Length(2, 255, {
    message: "test",
  })
  lastName: string;

  @Field()
  @IsEmail()
  @EmailExist({ message: "Email already exists" })
  email: string;

  @Field()
  @Length(6, 120, {
    message: "Password must be minimum length of 6 and maximum of 120 characters",
  })
  password: string;
}
