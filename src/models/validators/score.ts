// // import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

// // export function Match(property: string, validationOptions?: ValidationOptions) {
// //   return (object: any, propertyName: string) => {
// //     registerDecorator({
// //       target: object.constructor,
// //       propertyName,
// //       options: validationOptions,
// //       constraints: [property],
// //       validator: MatchConstraint
// //     })
// //   }
// // }

// export function ValidScore(score) {
//   return score <= 5 && score >= 0
// }

// // @ValidatorConstraint({ name: 'Match' })
// // export class MatchConstraint implements ValidatorConstraintInterface {
// //   validate(value: any, args: ValidationArguments) {
// //     const [relatedPropertyName] = args.constraints
// //     const relatedValue = (args.object as any)[relatedPropertyName]
// //     return !validScore(relatedValue, value)
// //   }

// //   defaultMessage(args: ValidationArguments) {
// //     const [relatedPropertyName] = args.constraints
// //     return `${relatedPropertyName} is greater than ${args.property}`
// //   }
// // }
