import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import { Role } from 'orm/entities/users/types';
import { User } from 'orm/entities/users/User';
import { JwtPayload } from 'types/JwtPayload';
import { createJwtToken } from 'utils/createJwtToken';
import { CustomError } from 'utils/response/custom-error/CustomError';

const refreshTokens = [];

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    // if (!user.checkIfPasswordMatch(password)) {
    //   const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
    //   console.log('err 25', customError);
    //   return next(customError);
    // }

    bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
        const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
        return next(customError);
      }
    });

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      created_at: user.created_at,
    };
    try {
      const accessToken = createJwtToken(jwtPayload);
      const refreshToken = jwt.sign(jwtPayload, process.env.JWT_REFRESH_TOKEN, { expiresIn: '2d' });
      refreshTokens.push(refreshToken);
      res.customSuccess(200, 'Token successfully created.', {
        accessToken: `Bearer ${accessToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      });
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      const customError = new CustomError(401, 'Raw', 'user not authenticated');
      return next(customError);
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
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
        return res.status(201).json({ accessToken });
      }
    });
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
