import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import Database from '../database/database';

export function Unique( validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'Unique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: (()=> (validationOptions?.message ? validationOptions :  {...validationOptions, message : propertyName + " value in " + object.constructor.name + " must be unique in the table" }))(),
      validator: {
        async validate(value: any, args: ValidationArguments) {  
            const db = new Database() 
            const entity = await db.getManager().findOne(object.constructor.name, {[propertyName] : value} )     
    
            
            return entity ? false : true
        },
      },
    });
  };
}