import { UnauthorizedException } from '@nestjs/common';
import { UserModel } from 'src/modules/auth/models/user.model';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/modules/auth/entities/user.entity';

export async function checkUserPassword(
  user: UserEntity,
  password: String,
): Promise<boolean> {
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return false;
  }

  return true;
}
