import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Loan } from '../entities/Loan';
import { Book } from '../entities/Book';
import { User } from '../entities/User';

export class LoanController {
  async return(req: Request, res: Response) {
    const { id } = req.params;
    const loanRepository = AppDataSource.getRepository(Loan);
    const bookRepository = AppDataSource.getRepository(Book);

    try {
      const loan = await loanRepository.findOne({
        where: { id, isActive: true },
        relations: ['book']
      });

      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
      }

      if (loan.isReturned) {
        return res.status(400).json({ message: 'Book already returned' });
      }

      // Update loan status
      loan.isReturned = true;
      loan.actualReturnDate = new Date();
      loan.isOverdue = loan.actualReturnDate > loan.expectedReturnDate;

      // Update book available quantity
      const book = loan.book;
      book.availableQuantity += 1;
      await bookRepository.save(book);

      // Save the updated loan
      await loanRepository.save(loan);

      return res.json(loan);
    } catch (error) {
      console.error('Error returning book:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    const { bookId, expectedReturnDate } = req.body;
    const userId = req.user?.id; // Assuming user ID is set by auth middleware
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User ID not found' });
    }

    const loanRepository = AppDataSource.getRepository(Loan);
    const bookRepository = AppDataSource.getRepository(Book);
    const userRepository = AppDataSource.getRepository(User);

    try {
      // Find the book
      const book = await bookRepository.findOne({ where: { id: bookId } });
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Check if book is available
      if (book.availableQuantity <= 0) {
        return res.status(400).json({ message: 'Book is not available for loan' });
      }

      // Find the user
      const user = await userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Create new loan
      const loan = new Loan();
      loan.book = book;
      loan.user = user;
      loan.expectedReturnDate = new Date(expectedReturnDate);

      // Update book available quantity
      book.availableQuantity -= 1;
      await bookRepository.save(book);

      // Save the loan
      const savedLoan = await loanRepository.save(loan);

      return res.status(201).json(savedLoan);
    } catch (error) {
      console.error('Error creating loan:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async list(_req: Request, res: Response) {
    const loanRepository = AppDataSource.getRepository(Loan);

    try {
      const loans = await loanRepository.find({
        where: { isActive: true },
        relations: ['user', 'book']
      });

      return res.json(loans);
    } catch (error) {
      console.error('Error listing loans:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const loanRepository = AppDataSource.getRepository(Loan);

    try {
      const loan = await loanRepository.findOne({
        where: { id, isActive: true },
        relations: ['user', 'book']
      });

      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
      }

      return res.json(loan);
    } catch (error) {
      console.error('Error fetching loan:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}