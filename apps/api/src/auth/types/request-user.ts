import e from 'express';
import { User } from '@prisma/client';

export interface RequestUser extends e.Request {
  user: User;
}
