import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsEqualToProperty<T>(
  property: keyof T,
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'isEqualToProperty',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as T)[
            relatedPropertyName as keyof T
          ];
          return value === relatedValue;
        },
      },
    });
  };
}
