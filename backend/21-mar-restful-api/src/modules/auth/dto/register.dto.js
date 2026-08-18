import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegiesterDto extends BaseDto {
  static schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid("customer", "seller", "admin").default("customer"),
  });
}

export default RegiesterDto;