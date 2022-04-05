import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { Token } from 'orm/entities/tokens/Token';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  const tokenRepository = getRepository(Token);
  try {
    const refToken = req.body.refToken;
    if (!refToken) {
      const customError = new CustomError(401, 'Raw', 'Error refreshToken not found');
      return next(customError);
    }
    const token = await tokenRepository.findOne({ select: ['id'], where: { refreshToken: refToken } });
    if (!token) {
      const customError = new CustomError(401, 'Raw', 'user not authenticated');
      return next(customError);
    }
    if (token) {
      tokenRepository.delete(token.id);
      return res.status(201).json('Succesfully logged out');
    }
  } catch (error) {
    console.log('ERRRR', error);
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
