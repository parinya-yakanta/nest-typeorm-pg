import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: any): Promise<any> {
    return this.authService.login(request.user);
  }
}
