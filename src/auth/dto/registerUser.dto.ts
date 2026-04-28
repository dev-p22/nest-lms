import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class registerDto {
  @IsNotEmpty()
  @IsString()
  fname!: string;

  @IsNotEmpty()
  @IsString()
  lname!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
