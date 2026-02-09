import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Le nom doit être une chaine de caractères valides.' })
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @MinLength(3, {
    message: "Le nom doit être composé d'au moins trois caractères",
  })
  @MaxLength(25, {
    message: "Le nom doit être composé d'un maximum de vingt cinq caractères",
  })
  name: string;

  @IsEmail(
    {},
    { message: 'Cette rubrique doit contenir une adresse mail valide' },
  )
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  email: string;

  @IsOptional()
  @IsEnum(['admin', 'user'], { message: 'Le role doit être admin ou user.' })
  role?: 'admin' | 'user';
}
