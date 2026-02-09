import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from '../../types/usersType';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // /users
  @HttpCode(200)
  findAllUsers(): User[] {
    return this.usersService.findAllUsers();
  }

  @Get(':id') // /users, paraètres d'URL
  @HttpCode(200)
  findOneUser(@Param('id') id: string): User {
    console.log(`User ${id} has been found.`);
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
  createUser(@Body() user: User): User {
    console.log(`User has been created.`);
    return this.usersService.createUser(user);
  }

  @Patch(':id')
  @HttpCode(200)
  updateUser(@Param('id') id: string, @Body() user: User): User {
    console.log(`User ${id} has been successfully updated.`);
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): string {
    console.log(`User ${id} has been successfully deleted.`);
    return this.usersService.deleteUser(id);
  }
}
