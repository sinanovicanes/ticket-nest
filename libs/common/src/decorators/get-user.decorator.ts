import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Manager } from '../types';

export const GetUser = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Manager;

    if (!user) throw new UnauthorizedException('User not found');

    return data ? user[data] : user;
  },
);
