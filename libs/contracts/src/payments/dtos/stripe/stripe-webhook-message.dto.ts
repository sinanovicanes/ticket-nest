import { IsObject, IsString } from 'class-validator';
export class StripeWebhookMessageDto {
  @IsString()
  signature: string;

  @IsObject()
  payload: any;
}
