import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Book } from 'orm/entities/books/Book';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
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
    userId,
    isReading,
  } = req.body;
  const booksRepository = getRepository(Book);
  const book2update = await booksRepository.findOne({ where: { id: id } });

  book2update.name = name;
  book2update.author = author;
  book2update.firstEdition = firstEdition;
  book2update.originalName = originalName;
  book2update.genres = genres;
  book2update.description = description;
  book2update.startReadDate = startReadDate;
  book2update.endReadDate = endReadDate;
  book2update.photo = photo;
  book2update.evaluation = evaluation;
  book2update.numberOfPages = numberOfPages;
  book2update.publishHouse = publishHouse;
  book2update.updatedAt = new Date();
  book2update.userId = userId;
  book2update.isReading = isReading;
  try {
    const updatedBook = await booksRepository.save(book2update);
    res.customSuccess(200, 'Book successfully updated.', updatedBook);
  } catch (error) {
    const customError = new CustomError(400, 'Raw', 'Error', null, error);
    return next(customError);
  }
};
