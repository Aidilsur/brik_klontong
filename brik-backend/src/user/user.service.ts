import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    try {
      const hashed = await bcrypt.hash(password, 10);

      const user = this.userRepo.create({
        email,
        name: username,
        password: hashed,
      });

      return await this.userRepo.save(user);
    } catch (error) {
      console.error('Terjadi kesalahan saat membuat user:', error);
      throw new Error('Pembuatan user gagal');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });
  }
}
