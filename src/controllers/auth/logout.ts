import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { Token } from 'orm/entities/tokens/Token';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const tokenRepository = getRepository(Token);
  try {
    const refToken = req.body.refreshToken;
    if (!refToken) {
      const customError = new CustomError(401, 'Raw', 'Error accessToken not found');
      return next(customError);
    }
    const token = await tokenRepository.findOne({ where: { refreshToken: { refToken } } });
    tokenRepository.delete(token.id);
  } catch (error) {}
};
