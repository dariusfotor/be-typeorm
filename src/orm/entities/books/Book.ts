import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  author: string;

  @Column()
  firstEdition: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @CreateDateColumn()
  updatedAt: Date;

  @Column({
    nullable: false,
    default: '',
  })
  originalName: string;

  @Column({
    nullable: false,
    default: '',
  })
  genres: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column()
  startReadDate: string;

  @Column()
  endReadDate: string;

  @Column({
    nullable: false,
    default: '',
  })
  publishHouse: string;

  @Column({
    nullable: false,
    default: '',
  })
  photo: string;

  @Column({
    nullable: false,
    default: 0,
  })
  evaluation: number;

  @Column({
    nullable: false,
    default: 0,
  })
  numberOfPages: number;

  @Column()
  userId: number;

  @Column()
  isReading: number;
}
