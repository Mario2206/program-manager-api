import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsOneOf(property: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {                   
            return property.includes(value)
        },
      },
    });
  };
}