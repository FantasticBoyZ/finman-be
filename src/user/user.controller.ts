import { Controller, Get } from '@nestjs/common';
import { createUser } from '../db/queries';

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    const newUser = {
      lastName: 'Khoi',
      firstName: 'Vu',
      account: 'khoivt',
      birthday: '02-12-2000',
      email: 'khoivt@local',
      balance: '50000',
    };
    createUser(newUser);
    return 'This action returns all users';
  }
}
