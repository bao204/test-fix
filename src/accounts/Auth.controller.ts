import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './Auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.validateUser(loginDto);
    return { accessToken: result.token, employee: result.employee }; // Đảm bảo trả về đúng thông tin
  }
}
