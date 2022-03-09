import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

import { Books } from '../../orm/entities/books/Books';

export const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  const booksRepository = getRepository(Books);
  try {
    const books = await booksRepository.find({
      select: [
        'id',
        'name',
        'author',
        'firstEdition',
        'createdAt',
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
      ],
    });
    res.customSuccess(200, 'List of books.', books);
  } catch (error) {
    console.log(error);
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of books.`, null, error);
    return next(customError);
  }
};
