import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserController {
  private repository = AppDataSource.getRepository(User);

  async register(request: Request, response: Response) {
    const { name, email, password, phone, address } = request.body;

    try {
      const userExists = await this.repository.findOne({ where: { email } });

      if (userExists) {
        return response.status(400).json({
          message: 'Usuário já existe com este email'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.repository.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
      });

      await this.repository.save(user);

      const { password: _, ...userWithoutPassword } = user;
      return response.status(201).json(userWithoutPassword);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao criar usuário',
        error: error.message
      });
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await this.repository.findOne({ where: { email, isActive: true } });

      if (!user) {
        return response.status(401).json({
          message: 'Email ou senha inválidos'
        });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return response.status(401).json({
          message: 'Email ou senha inválidos'
        });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1d' }
      );

      const { password: _, ...userWithoutPassword } = user;
      return response.json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao fazer login',
        error: error.message
      });
    }
  }

  async profile(request: Request, response: Response) {
    const userId = request.user?.id;

    try {
      const user = await this.repository.findOne({
        where: { id: userId, isActive: true },
        select: ['id', 'name', 'email', 'phone', 'address', 'createdAt', 'updatedAt']
      });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      return response.json(user);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao buscar perfil',
        error: error.message
      });
    }
  }

  async update(request: Request, response: Response) {
    const userId = request.user?.id;
    const { name, phone, address } = request.body;

    try {
      const user = await this.repository.findOne({
        where: { id: userId, isActive: true }
      });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.address = address || user.address;

      await this.repository.save(user);

      const { password: _, ...userWithoutPassword } = user;
      return response.json(userWithoutPassword);
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao atualizar usuário',
        error: error.message
      });
    }
  }

  async delete(request: Request, response: Response) {
    const userId = request.user?.id;

    try {
      const user = await this.repository.findOne({
        where: { id: userId }
      });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      await this.repository.remove(user);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao deletar usuário',
        error: error.message
      });
    }
  }

  async addFavoriteBook(request: Request, response: Response) {
    const userId = request.user?.id;
    const { bookId } = request.body;

    try {
      const user = await this.repository.findOne({
        where: { id: userId, isActive: true }
      });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      if (!user.favoriteBooks.includes(bookId)) {
        user.favoriteBooks.push(bookId);
        await this.repository.save(user);
      }

      return response.json({
        message: 'Livro adicionado aos favoritos'
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao adicionar livro aos favoritos',
        error: error.message
      });
    }
  }

  async removeFavoriteBook(request: Request, response: Response) {
    const userId = request.user?.id;
    const { bookId } = request.params;

    try {
      const user = await this.repository.findOne({
        where: { id: userId, isActive: true }
      });

      if (!user) {
        return response.status(404).json({
          message: 'Usuário não encontrado'
        });
      }

      user.favoriteBooks = user.favoriteBooks.filter(id => id !== bookId);
      await this.repository.save(user);

      return response.json({
        message: 'Livro removido dos favoritos'
      });
    } catch (error) {
      return response.status(400).json({
        message: 'Erro ao remover livro dos favoritos',
        error: error.message
      });
    }
  }
}