import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserappService {
  constructor(private readonly databaseService: DatabaseService) {}
  createUser(createUser: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUser,
    });
  }

  findAllUsers(role?: string) {
    // On peut demander les utilisateurs ayant un role précis
    if (role) {
      return this.databaseService.user.findMany({
        where: {
          role: role as Role,
        },
      });
    }
    // ou récupérer tous les utilisateurs
    return this.databaseService.user.findMany();
  }

  findOneUser(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  updateUser(id: number, updateUser: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: { id },
      data: updateUser,
    });
  }

  removeUser(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
