import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { Book } from '../../orm/entities/books/Book';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  const booksRepository = getRepository(Book);
  const id = req.query.userId;
  try {
    const books = await booksRepository.find({
      where: { userId: id },
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'name',
        'author',
        'firstEdition',
        'createdAt',
        'updatedAt',
        'originalName',
        'genres',
        'description',
        'startReadDate',
        'endReadDate',
        'publishHouse',
        'photo',
        'evaluation',
        'numberOfPages',
        'userId',
        'isReading',
      ],
    });
    res.customSuccess(200, 'List of books.', books);
  } catch (error) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, error);
    return next(customError);
  }
};
