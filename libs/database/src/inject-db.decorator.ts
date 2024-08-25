import { Inject } from '@nestjs/common';
import { DB_PROVIDER_TOKEN } from './constants';

export const InjectDB = () => Inject(DB_PROVIDER_TOKEN);
