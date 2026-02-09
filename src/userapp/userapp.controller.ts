import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserappService } from './userapp.service';
import { Prisma } from '@prisma/client';

@Controller('userapp')
export class UserappController {
  constructor(private readonly userappService: UserappService) {}

  @Post()
  @HttpCode(201)
  createUser(@Body() createUser: Prisma.UserCreateInput) {
    const user = this.userappService.createUser(createUser);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new BadRequestException('Failed to create user');
    }
    return user;
  }

  @Get()
  @HttpCode(200)
  findAllUsers(@Query('role') role?: string) {
    const users = this.userappService.findAllUsers(role);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!users) {
      throw new NotFoundException('No users found.');
    }
    return users;
  }

  @Get(':id')
  @HttpCode(200)
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.findOneUser(id);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  @Patch(':id')
  @HttpCode(200)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: Prisma.UserUpdateInput,
  ) {
    const user = this.userappService.updateUser(id, updateUser);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new BadRequestException('Failed to update user.');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(200)
  removeUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.userappService.removeUser(id);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!user) {
      throw new NotFoundException("User not found and can't be delete.");
    }
    return user;
  }
}
