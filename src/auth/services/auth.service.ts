import { SignInUserDto } from './../dto/get_user.dto';
import { CreateUserDto } from './../dto/create_user.dto';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { USERAUTHREPO } from '../providers/auth.provider';
import { UserAuthInterface } from '../repo/user.atuh.interface';
import { UserModel } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { checkUserPassword } from 'src/core/functions/get_user_auth';
import { genrateEncriptedPassword } from 'src/core/functions/genrate_encripted_password';
@Injectable()
export class AuthService {
  constructor(
    @Inject(USERAUTHREPO) private readonly taskRepository: UserAuthInterface,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const { userName, password, name } = createUserDto;

    const hashedPassword = await genrateEncriptedPassword(password);

    await this.taskRepository.createNewUser(userName, hashedPassword, name);

    return { message: 'User created successfully' };
  }

  async singIn(getUserDto: SignInUserDto): Promise<UserModel> {
    console.log('signin');

    const user = await this.taskRepository.getUser(getUserDto.userName);

    const res = await checkUserPassword(user, getUserDto.password);

    if (!res) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { id: user.id, userName: user.userName };
    const token = this.jwtService.sign(payload, { expiresIn: 3600 });
    return {
      id: user.id,
      userName: user.userName,
      token: token,
    };
  }
}
