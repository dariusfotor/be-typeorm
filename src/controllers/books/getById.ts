import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { Book } from '../../orm/entities/books/Book';

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  const booksRepository = getRepository(Book);
  const id = req.params.id;
  try {
    const book = await booksRepository.findOne({
      where: { id: id },
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
    res.customSuccess(200, 'One book.', book);
  } catch (error) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, error);
    return next(customError);
  }
};
