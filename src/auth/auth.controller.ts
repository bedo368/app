import { get } from 'http';
import { CreateUserDto } from './dto/create_user.dto';
import { AuthService } from './services/auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SignInUserDto } from './dto/get_user.dto';
import { error } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    const res = await this.authService.signUp(createUserDto);

    return {
      message: res.message,
    };
  }

  @Post('signin')
  @HttpCode(200)
  async signin(@Body() getUserDto: SignInUserDto) {
    const result = await this.authService.singIn(getUserDto);
    return { 
      error: false,
      data: {
        user: result,
      },
      message: 'success',
    };
  }
}
