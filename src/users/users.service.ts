import { Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '../../types/usersType';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
      role: 'admin',
    },
    {
      id: 4,
      name: 'Jill Doe',
      email: 'jill.doe@example.com',
      role: 'admin',
    },
    {
      id: 5,
      name: 'Jack Doe',
      email: 'jack.doe@example.com',
      role: 'admin',
    },
  ];

  findAllUsers(): User[] {
    return this.users;
  }

  findOneUser(id: number): User {
    const user = this.users.find((user) => user.id == id);
    if (!user) {
      throw new NotFoundException('User not registered in the table');
    }
    return user;
  }

  createUser(createUser: CreateUserDto): User {
    const newId = this.users.length + 1; // Ici, on récupère la longueur du tableau d'users pour assigner un id unique au nouvel user
    const newUser: User = {
      ...createUser, // spread operator pour récupérer les données du nouveau user en cours de création
      id: newId, // Assignation de l'id déterminé plus haut
    };
    this.users.push(newUser); // Insertion du nouvel objet dans le tableau users
    return newUser;
  }

  updateUser(id: number, updatedUser: UpdateUserDto): User {
    const index = this.users.findIndex((user) => user.id == id);
    if (index == -1) {
      throw new NotFoundException('Invalid id. User not found.');
    }
    this.users[index] = { ...updatedUser, id };
    return this.users[index];
  }

  deleteUser(id: number): string {
    this.users = this.users.filter((user) => user.id != id);
    // Pas très sur pour ce test
    if (this.users.length === this.users.length) {
      throw new NotFoundException('User not found, delete is impossible.');
    }
    return 'User successfully deleted from table';
  }
}
