import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { Category } from '../entities/Category';
import { Review } from './Review';
import { Loan } from '../entities/Loan';
import { IsNotEmpty, IsString, IsInt, Min, Matches, IsUrl } from 'class-validator';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  @Index({ fulltext: true })
  title: string;

  @Column()
  @IsNotEmpty({ message: 'Author is required' })
  @IsString()
  @Index()
  author: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'ISBN is required' })
  @Matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, {
    message: 'Invalid ISBN format'
  })
  @Index()
  isbn: string;

  @Column('text')
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsUrl({}, { message: 'Invalid image URL' })
  imageUrl: string;

  @Column()
  @IsNotEmpty({ message: 'Quantity is required' })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(0, { message: 'Quantity cannot be negative' })
  quantity: number;

  @Column()
  @IsNotEmpty({ message: 'Available quantity is required' })
  @IsInt({ message: 'Available quantity must be an integer' })
  @Min(0, { message: 'Available quantity cannot be negative' })
  availableQuantity: number;

  @ManyToOne(() => Category, category => category.books, {
    nullable: false,
    onDelete: 'RESTRICT',
    eager: true
  })
  category: Category;

  @OneToMany(() => Review, review => review.book, {
    cascade: true
  })
  reviews: Review[];

  @OneToMany(() => Loan, loan => loan.book, {
    cascade: true
  })
  loans: Loan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}