import { Manager } from '@app/common/types';
import { Database, InjectDB, managementAccountSchema } from '@app/database';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    @InjectDB() private readonly db: Database,
    private readonly jwtService: JwtService,
  ) {}

  async validateEmail(email: string): Promise<Manager> {
    const results = await this.db
      .select({
        id: managementAccountSchema.id,
        email: managementAccountSchema.email,
      })
      .from(managementAccountSchema)
      .where(eq(managementAccountSchema.email, email));
    const result = results.pop();

    if (!result) {
      throw new UnauthorizedException();
    }

    return result;
  }

  generateJwtTokens(manager: Manager) {
    return {
      accessToken: this.jwtService.sign({
        sub: manager.id,
        email: manager.email,
      }),
    };
  }
}
