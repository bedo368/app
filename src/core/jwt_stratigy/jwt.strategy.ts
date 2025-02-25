import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/modules/auth/entities/user.entity';
import { USERAUTHREPO } from 'src/modules/auth/providers/auth.provider';
import { UserAuthInterface } from 'src/modules/auth/repo/user.atuh.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERAUTHREPO) private readonly userRepo: UserAuthInterface,
  ) {
    super({
      secretOrKey: 'blablabla',

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(args): Promise<UserEntity> {
    const { userName } = args;

    const user: UserEntity = await this.userRepo.getUser(userName);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.password = "";
    return user;
  }
}
