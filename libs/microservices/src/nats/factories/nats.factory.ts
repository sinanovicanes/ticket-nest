import {
  ClientNats,
  ClientsProviderAsyncOptions,
  NatsOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { NatsServices } from '../enums';

class ErrorHandlingProxy extends ClientNats {
  serializeError(err: Error) {
    return new RpcException(err);
  }
}

export class NatsFactory {
  static createOptions(service: NatsServices): NatsOptions {
    return {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        queue: `${service.toLowerCase()}_queue`,
      },
    };
  }

  static createClientProvider(
    service: NatsServices,
  ): ClientsProviderAsyncOptions {
    return {
      name: service,
      useFactory: () => ({
        ...NatsFactory.createOptions(service),
        customClass: ErrorHandlingProxy,
      }),
    };
  }
}
