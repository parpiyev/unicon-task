import { IsNotEmpty, IsString, IsIn, IsNumber } from 'class-validator';

export class UpdateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  controller: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['accept', 'reject'])
  status: 'accept' | 'reject';
}
