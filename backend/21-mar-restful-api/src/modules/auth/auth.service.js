import ApiError from "../../common/utils/api-error.js";
import { generateResetToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const register = async ({ name, email, password, role }) => {
  // Implement the logic to register a new user

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw ApiError.conflict("User with this email already exists");
  }

  const { rawToken, hashedToken } = generateResetToken();

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken: hashedToken,
  });

//   send an email to user with the rawToken for verification (this part is not implemented here)

  const userObj = user.toObject();
  delete userObj.password; // Remove password from the response
  delete userObj.verificationToken; // Remove verification token from the response

  return userObj;
};

export { register };
