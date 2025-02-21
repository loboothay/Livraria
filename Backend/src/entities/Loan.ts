import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Book } from './Book';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.loans)
  user: User;

  @ManyToOne(() => Book, book => book.loans)
  book: Book;

  @CreateDateColumn()
  loanDate: Date;

  @Column()
  expectedReturnDate: Date;

  @Column({ nullable: true })
  actualReturnDate: Date;

  @Column({ default: false })
  isReturned: boolean;

  @Column({ default: false })
  isOverdue: boolean;

  @Column({ default: false })
  reminderSent: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}