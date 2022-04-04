import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

export const createRefreshJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_EXPIRATION });
};
