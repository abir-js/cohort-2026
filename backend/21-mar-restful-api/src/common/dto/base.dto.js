import Joi from "joi";

class BaseDto {
  static schema = Joi.object({});

  static validate(data) {
    const { error, value } = this.schema.validate(data, {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown keys from the validated data and prevents DDOS attacks
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return { errors, value: null };
    }
    return { errors: null, value };
  }
}

export default BaseDto;