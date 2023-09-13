import { ValidationArguments, registerDecorator } from "class-validator";

function IsJsonObject() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isJsonObject",
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: unknown) {
          return (
            typeof value === "object" && value !== null && !Array.isArray(value)
          );
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments.property} must be a valid object`;
        }
      }
    });
  };
}

export default IsJsonObject;
