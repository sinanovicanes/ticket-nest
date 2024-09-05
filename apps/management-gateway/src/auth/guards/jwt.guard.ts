import { IS_PUBLIC_KEY } from '@app/common/constants';
import { Manager } from '@app/common/types';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private readonly reflector: Reflector = new Reflector();

  private extractJwtTokenFromCookie(req: Request) {
    return req.cookies ? req.cookies.accessToken : null;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const accessToken = this.extractJwtTokenFromCookie(req);

    try {
      const decoded: Manager = this.jwtService.verify(accessToken);
      req.user = decoded;

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
