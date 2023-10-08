import { ValidationArguments, registerDecorator } from "class-validator";
import { z } from "zod";

function IsValidUserMetaData() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isJsonObject",
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: unknown) {
          const metadataSchema = z
            .object({
              department: z.string().optional(),
              section: z.string().optional(),
              batch: z.number().optional(),
              cgpa: z.number().optional(),
              about: z.string().max(1024).optional(),
              website: z.string().url().optional(),
              skills: z.array(z.string()).optional()
            })
            .strict();
          const validationResult = metadataSchema.safeParse(value);
          if (!validationResult.success) return false;
          return true;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `Invalid ${validationArguments.property}`;
        }
      }
    });
  };
}

export default IsValidUserMetaData;
