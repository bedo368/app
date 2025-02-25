import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { USERAUTHREPO, userAuthRepoProvider } from './providers/auth.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({secret : 'blablabla'})
  ],
  controllers: [AuthController],
  providers: [AuthService , userAuthRepoProvider],
  exports:[USERAUTHREPO]
})
export class AuthModule {
  
}
