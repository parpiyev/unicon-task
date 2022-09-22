import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  createdBy: number;

  @IsNotEmpty()
  @IsNumber()
  task: number;

  @IsOptional()
  @IsString()
  text: string;
}
