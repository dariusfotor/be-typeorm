import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { Book } from '../../orm/entities/books/Book';

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const booksRepository = getRepository(Book);
  const book2delete = await booksRepository.findOne({ where: { id: id } });
  try {
    await booksRepository.remove(book2delete);
    res.customSuccess(200, 'Book successfully deleted.');
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
