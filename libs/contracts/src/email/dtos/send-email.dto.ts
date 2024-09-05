import { IsEmail, IsEnum, IsObject, IsOptional } from 'class-validator';
import { EmailTemplates } from '../enums';

export class SendEmailDto {
  @IsEnum(EmailTemplates)
  template: EmailTemplates;

  @IsEmail()
  to: string;

  @IsOptional()
  @IsObject()
  ctx?: Record<string, any>;
}
