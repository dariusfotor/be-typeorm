import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('books')
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  firstEdition: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  originalName: string;

  @Column()
  genres: string;

  @Column()
  description: string;

  @Column()
  startReadDate: Date;

  @Column()
  endReadDate: Date;

  @Column()
  publishHouse: string;

  @Column()
  photo: string;

  @Column()
  evaluation: string;

  @Column()
  numberOfPages: string;
}
