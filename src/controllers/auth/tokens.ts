import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken = req.headers['authorization'];
    accessToken = accessToken && accessToken.split('')[1];
    if (!accessToken) {
      const customError = new CustomError(401, 'Raw', 'Error accessToken not found');
      return next(customError);
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        const customError = new CustomError(403, 'Raw', 'Error', null, err);
        return next(customError);
      } else {
        req.body.user = user;
        next();
      }
    });
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
