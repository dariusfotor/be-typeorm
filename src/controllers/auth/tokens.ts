import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { Token } from 'orm/entities/tokens/Token';
import { Role } from 'orm/entities/users/types';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken, createRefreshJwtToken } from 'utils/createJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken = req.headers['authorization'];
    if (!accessToken) {
      const customError = new CustomError(401, 'Raw', 'Error accessToken not found');
      return next(customError);
    }
    accessToken = accessToken && accessToken.split(' ')[1];
    jwt.verify(accessToken, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        const customError = new CustomError(403, 'Raw', 'Error', null, err);
        return next(customError);
      } else {
        // req.body.user = user;
        next();
      }
    });
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokenRepository = getRepository(Token);
    const refreshToken = req.body.token;
    const refreshTokenFromDB = await tokenRepository.findOne({ where: { refreshToken } });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, async (err, user) => {
      if (err) {
        const customError = new CustomError(401, 'Raw', 'Error accessToken not found');
        return next(customError);
      } else {
        const jwtPayload: JwtPayload = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as Role,
          created_at: user.created_at,
        };
        const accessToken = createJwtToken(jwtPayload);
        const refreshToken = createRefreshJwtToken(jwtPayload);

        const token2Save = new Token();
        token2Save.refreshToken = refreshToken;
        token2Save.userId = user.id;
        token2Save.id = refreshTokenFromDB.id;
        await tokenRepository.save(token2Save);
        return res.status(201).json({ accessToken: `Bearer ${accessToken}`, refreshToken: `Bearer ${refreshToken}` });
      }
    });
    if (!refreshTokenFromDB) {
      const customError = new CustomError(401, 'Raw', 'user not authenticated');
      return next(customError);
    }
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
