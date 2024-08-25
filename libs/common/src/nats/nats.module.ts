import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { NatsServices } from './enums';
import { NatsFactory } from './factories';

@Module({})
export class NatsModule {
  static register(...services: NatsServices[]): DynamicModule {
    return {
      module: NatsModule,
      imports: [
        ClientsModule.register({
          clients: services.map((service) =>
            NatsFactory.createClientProvider(service),
          ),
        }),
      ],
      providers: [],
      exports: [ClientsModule],
    };
  }
}
