import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
// Stocker les roles dans les métadonnées et création du décorateur @Roles() qui en découle
// Permet de controler quel role peut accéder à quelle route
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
//
export const Userapp = (...args: string[]) => SetMetadata('userapp', args);
