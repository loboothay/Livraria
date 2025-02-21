import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
// Removed unused import 'Book'
import { Review } from './Review';
import { Loan } from './Loan';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @OneToMany(() => Loan, loan => loan.user)
  loans: Loan[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @Column('text', { array: true, default: [] })
  favoriteBooks: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}