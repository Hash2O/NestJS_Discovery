import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
// UpdateUserDto hérite partiellement de CreateUserDto ici
export class UpdateUserDto extends PartialType(CreateUserDto) {}
