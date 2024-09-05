import { ManagementAccount } from '@app/database';

export type Manager = Pick<ManagementAccount, 'id' | 'email'>;
