import { NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class LocationNotFoundException extends RpcException {
  constructor(id?: string) {
    const message = id
      ? `Location with id ${id} not found`
      : 'Location not found';

    super(new NotFoundException(message));
  }
}
