import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from '../../types/usersType';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard) // Ici, on règlemente l'accès à cette route
  @Get() // /users
  @HttpCode(200)
  findAllUsers(): User[] {
    return this.usersService.findAllUsers();
  }

  @Get(':id') // /users, paraètres d'URL
  @HttpCode(200)
  findOneUser(@Param('id', ParseIntPipe) id: number): User {
    //console.log(`User ${id} has been found.`);
    return this.usersService.findOneUser(id);
  }

  @Get()
  @HttpCode(200)
  findAllUsersWithQuery(
    // Paramètres de requête
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): string {
    return `Page: ${page}, Limit: ${limit}`;
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUser: CreateUserDto): User {
    console.log(`User has been created.`);
    return this.usersService.createUser(createUser);
  }

  @Patch(':id')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ): User {
    console.log(`User ${id} has been successfully updated.`);
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', ParseIntPipe) id: number): string {
    //console.log(`User ${id} has been successfully deleted.`);
    return this.usersService.deleteUser(id);
  }
}
