import {
  IsAlphanumeric,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateLogDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(9999999999999)
  timestamp: number;

  @IsNotEmpty()
  @IsEnum(['numberEntered', 'operatorEntered', 'equalsPressed'])
  event: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class CreateLogQueryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
