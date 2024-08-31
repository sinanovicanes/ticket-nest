import { IsDefined, IsString } from 'class-validator';
export class StripeWebhookMessageDto {
  @IsString()
  signature: string;

  @IsDefined()
  payload: Buffer;
}
