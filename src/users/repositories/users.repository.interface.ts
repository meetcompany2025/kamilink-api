import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export abstract class UsersRepositoryInterface {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByPhone(phone: string): Promise<User | null>;
  abstract findById(id: string): Promise<any>;
  abstract update(id: string, data: UpdateUserDto): Promise<any>;
  abstract updateVerificationStatus(
    userId: string,
    isVerified: boolean,
  ): Promise<void>;
}

// import { User } from '@prisma/client';

// export abstract class UserRepository {
//   abstract findByEmail(email: string): Promise<User | null>;
//   abstract findById(id: string): Promise<User | null>;
//   abstract create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
// }
