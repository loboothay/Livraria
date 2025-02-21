import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Book } from '../entities/Book';
import { Like } from 'typeorm';

export class BookController {
  private repository = AppDataSource.getRepository(Book);

  async create(request: Request, response: Response) {
    const { title, author, isbn, description, imageUrl, quantity, categoryId } = request.body;

    try {
      const bookExists = await this.repository.findOne({ where: { isbn } });

      if (bookExists) {
        return response.status(400).json({
          message: 'Já existe um livro com este ISBN'
        });
      }

      const book = this.repository.create({
        title,
        author,
        isbn,
        description,
        imageUrl,
        quantity,
        availableQuantity: quantity,
        category: { id: categoryId }
      });

      await this.repository.save(book);

      return response.status(201).json(book);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar livro',
        error: error.message
      });
    }
  }

  async list(request: Request, response: Response) {
    const { search, category } = request.query;

    try {
      const where: any = { isActive: true };

      if (search) {
        where.title = Like(`%${search}%`);
      }

      if (category) {
        where.category = { id: category };
      }

      const books = await this.repository.find({
        where,
        relations: ['category']
      });

      return response.json(books);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao listar livros',
        error: error.message
      });
    }
  }

  async getOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const book = await this.repository.findOne({
        where: { id, isActive: true },
        relations: ['category', 'reviews']
      });

      if (!book) {
        return response.status(404).json({
          message: 'Livro não encontrado'
        });
      }

      return response.json(book);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao buscar livro',
        error: error.message
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, author, description, imageUrl, quantity, categoryId } = request.body;

    try {
      const book = await this.repository.findOne({
        where: { id, isActive: true }
      });

      if (!book) {
        return response.status(404).json({
          message: 'Livro não encontrado'
        });
      }

      book.title = title || book.title;
      book.author = author || book.author;
      book.description = description || book.description;
      book.imageUrl = imageUrl || book.imageUrl;
      
      if (quantity !== undefined) {
        const quantityDiff = quantity - book.quantity;
        book.quantity = quantity;
        book.availableQuantity = Math.max(0, book.availableQuantity + quantityDiff);
      }

      if (categoryId) {
        book.category = { id: categoryId } as any;
      }

      await this.repository.save(book);

      return response.json(book);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao atualizar livro',
        error: error.message
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const book = await this.repository.findOne({
        where: { id, isActive: true }
      });

      if (!book) {
        return response.status(404).json({
          message: 'Livro não encontrado'
        });
      }

      book.isActive = false;
      await this.repository.save(book);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao deletar livro',
        error: error.message
      });
    }
  }
}