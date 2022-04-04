import cloudinary from 'cloudinary';
import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
