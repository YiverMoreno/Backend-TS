import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    firstName: string
    
    @IsString()
    @IsNotEmpty()    
    lastName: string
    
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    phone: number;
    
    @Type(() => Date)
    @IsDate()
    dateOfBirth: Date;

    @Type(() => Date)
    @IsDate()
    dateOfUpdate: Date;

}
