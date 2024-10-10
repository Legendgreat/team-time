import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Seeder } from 'nestjs-seeder'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Role } from 'src/guards/roles/role.enum'

export default class UserSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async getUsers(): Promise<Partial<User>[]> {
    const password = await bcrypt.hash('pass', 10)

    const userList: Partial<User>[] = [
      {
        username: 'admin',
        fullName: 'Admin',
        email: '',
        password,
        role: Role.Admin,
      },
    ]

    if (process.env.NODE_ENV === 'development') {
      userList.push(
        {
          username: 'user',
          fullName: 'User',
          email: '',
          password,
          role: Role.User,
        },
        {
          username: 'manager',
          fullName: 'Manager',
          email: '',
          password,
          role: Role.Manager,
        },
      )
    }

    return userList
  }

  async seed(): Promise<any> {
    const users = await this.getUsers()

    console.log('List of inputted users: ', users)

    const foundUsers = await this.usersRepository.find({
      where: users.map((user) => ({ username: user.username })),
    })

    console.log('Found users:', foundUsers)

    if (foundUsers.length == 0) {
      return this.usersRepository.save(users)
    }
  }

  async drop(): Promise<any> {
    const users = await this.getUsers()

    const foundUsers = await this.usersRepository.find({
      where: users.map((user) => ({ username: user.username })),
    })

    if (foundUsers.length !== 0) {
      return this.usersRepository.remove(foundUsers)
    }
  }
}
