import { IsInt, IsPositive, MinLength } from 'class-validator';

export class CreatePasswordDto {
  @MinLength(8)
  password: string;

  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  siteId: number;
}
