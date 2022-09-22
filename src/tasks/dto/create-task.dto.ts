import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  discription: string;

  @IsNotEmpty()
  @IsString()
  recipient: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
