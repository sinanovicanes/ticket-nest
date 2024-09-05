import { GetUser, Public } from '@app/common/decorators';
import { Manager } from '@app/common/types';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google.guard';

@UseGuards(GoogleAuthGuard)
@Controller('auth/google')
@Public()
export class GoogleAuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async login() {}

  @Get('redirect')
  async redirect(
    @GetUser() user: Manager,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = this.authService.generateJwtTokens(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return { message: 'Manager successfully authenticated' };
  }
}
