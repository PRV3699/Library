import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class AuthCredentialsDTO {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  password: string;

  @IsNotEmpty()
  email: string;
}
