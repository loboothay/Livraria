import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Review } from '../entities/Review';

export class ReviewController {
  private repository = AppDataSource.getRepository(Review);

  async create(request: Request, response: Response) {
    const userId = request.user?.id;
    const { bookId, content, rating } = request.body;

    try {
      const review = this.repository.create({
        content,
        rating,
        user: { id: userId },
        book: { id: bookId }
      });

      await this.repository.save(review);

      return response.status(201).json(review);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar avaliação',
        error: error.message
      });
    }
  }

  async list(request: Request, response: Response) {
    const { bookId } = request.query;

    try {
      const where: any = { isActive: true };

      if (bookId) {
        where.book = { id: bookId };
      }

      const reviews = await this.repository.find({
        where,
        relations: ['user', 'book'],
        order: { createdAt: 'DESC' }
      });

      return response.json(reviews);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao listar avaliações',
        error: error.message
      });
    }
  }

  async update(request: Request, response: Response) {
    const userId = request.user?.id;
    const { id } = request.params;
    const { content, rating } = request.body;

    try {
      const review = await this.repository.findOne({
        where: { id, isActive: true, user: { id: userId } },
        relations: ['user']
      });

      if (!review) {
        return response.status(404).json({
          message: 'Avaliação não encontrada ou não pertence ao usuário'
        });
      }

      review.content = content || review.content;
      review.rating = rating || review.rating;

      await this.repository.save(review);

      return response.json(review);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao atualizar avaliação',
        error: error.message
      });
    }
  }

  async delete(request: Request, response: Response) {
    const userId = request.user?.id;
    const { id } = request.params;

    try {
      const review = await this.repository.findOne({
        where: { id, isActive: true, user: { id: userId } },
        relations: ['user']
      });

      if (!review) {
        return response.status(404).json({
          message: 'Avaliação não encontrada ou não pertence ao usuário'
        });
      }

      review.isActive = false;
      await this.repository.save(review);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao deletar avaliação',
        error: error.message
      });
    }
  }

  async getUserReviews(request: Request, response: Response) {
    const userId = request.user?.id;

    try {
      const reviews = await this.repository.find({
        where: { isActive: true, user: { id: userId } },
        relations: ['book'],
        order: { createdAt: 'DESC' }
      });

      return response.json(reviews);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao buscar avaliações do usuário',
        error: error.message
      });
    }
  }
}