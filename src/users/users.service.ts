import { Injectable } from '@nestjs/common';
import type { User } from '../../types/usersType';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'admin',
    },
    {
      id: '3',
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
      role: 'admin',
    },
    {
      id: '4',
      name: 'Jill Doe',
      email: 'jill.doe@example.com',
      role: 'admin',
    },
    {
      id: '5',
      name: 'Jack Doe',
      email: 'jack.doe@example.com',
      role: 'admin',
    },
  ];

  findAllUsers(): User[] {
    return this.users;
  }

  findOneUser(id: string): User {
    return this.users.find((user) => user.id == id) as User;
  }

  createUser(user: User): User {
    const newId = (this.users.length + 1).toString(); // Ici, on récupère la longueur du tableau d'users pour assigner un id unique au nouvel user
    const newUser: User = {
      ...user, // spread operator pour récupérer les données du nouveau user en cours de création
      id: newId, // Assignation de l'id déterminé plus haut
    };
    this.users.push(newUser); // Insertion du nouvel objet dans le tableau users
    return newUser;
  }

  updateUser(id: string, user: User): User {
    const index = this.users.findIndex((user) => user.id == id);
    this.users[index] = user;
    return user;
  }

  deleteUser(id: string): string {
    this.users = this.users.filter((user) => user.id != id);
    return 'User successfully deleted from table';
  }
}
