import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { UsersRepositoryInterface } from './users.repository.interface';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { person: true },
    });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findFirst({
      where: {
        person: {
          phone,
        },
      },
      include: { person: true },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        person: true,
      },
      omit: {
        password: true,
      }
    });

    return users;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { person: true, client: true, transporter: true, images: true },
      omit: {
        password: true,
      }
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });

    const { password, ...resultado } = user;
    return resultado;
  }

  async updateVerificationStatus(userId: string, isVerified: boolean) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isVerified },
    });
  }
}
