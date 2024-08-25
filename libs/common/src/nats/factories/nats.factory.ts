import {
  ClientProviderOptions,
  NatsOptions,
  Transport,
} from '@nestjs/microservices';
import { NatsServices } from '../enums';

export class NatsFactory {
  static createNatsOptions(service: NatsServices): NatsOptions {
    return {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: `${service.toLowerCase()}_queue`,
      },
    };
  }

  static createClientProvider(service: NatsServices): ClientProviderOptions {
    return {
      name: service,
      ...NatsFactory.createNatsOptions(service),
    };
  }
}
