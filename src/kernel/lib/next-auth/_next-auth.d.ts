import NextAuth from 'next-auth';
import { SharedUser, SharedSession } from '../../domain/user';

declare module 'next-auth' {
  interface Session {
    user: SharedSession['user'];
  }
  interface User extends SharedUser {}
}
