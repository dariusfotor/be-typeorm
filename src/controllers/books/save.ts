import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Books } from 'orm/entities/books/Books';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const saveBook = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    author,
    firstEdition,
    originalName,
    genres,
    description,
    startReadDate,
    endReadDate,
    photo,
    evaluation,
    numberOfPages,
    publishHouse,
  } = req.body;
  const booksRepository = getRepository(Books);
  const book2Save = new Books();
  book2Save.name = name;
  book2Save.author = author;
  book2Save.firstEdition = firstEdition;
  book2Save.originalName = originalName;
  book2Save.genres = genres;
  book2Save.description = description;
  book2Save.startReadDate = startReadDate;
  book2Save.endReadDate = endReadDate;
  book2Save.photo = photo;
  book2Save.evaluation = evaluation;
  book2Save.numberOfPages = numberOfPages;
  book2Save.publishHouse = publishHouse;
  book2Save.createdAt = new Date();
  try {
    const newBook = await booksRepository.save(book2Save);
    res.customSuccess(200, 'User successfully saved.', newBook);
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
