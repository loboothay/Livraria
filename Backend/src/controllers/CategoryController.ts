import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';

export class CategoryController {
  private repository = AppDataSource.getRepository(Category);

  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      const category = this.repository.create({
        name,
        description
      });

      await this.repository.save(category);

      return response.status(201).json(category);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar categoria',
        error: error.message
      });
    }
  }

  async list(_request: Request, response: Response) {
    try {
      const categories = await this.repository.find({
        where: { isActive: true }
      });

      return response.json(categories);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao listar categorias',
        error: error.message
      });
    }
  }

  async getOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const category = await this.repository.findOne({
        where: { id, isActive: true }
      });

      if (!category) {
        return response.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      return response.json(category);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao buscar categoria',
        error: error.message
      });
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    try {
      const category = await this.repository.findOne({
        where: { id, isActive: true }
      });

      if (!category) {
        return response.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      category.name = name;
      category.description = description;

      await this.repository.save(category);

      return response.json(category);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao atualizar categoria',
        error: error.message
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const category = await this.repository.findOne({
        where: { id }
      });

      if (!category) {
        return response.status(404).json({
          message: 'Categoria não encontrada'
        });
      }

      await this.repository.remove(category);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao deletar categoria',
        error: error.message
      });
    }
  }
}