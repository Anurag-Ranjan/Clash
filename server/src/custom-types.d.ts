interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
}

declare namespace Express {
  export interface Request {
    user?: AuthUser;
  }
}
