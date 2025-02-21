import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token não fornecido'
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: decoded.id, isActive: true },
      select: ['id', 'name', 'email']
    });

    if (!user) {
      return response.status(401).json({
        message: 'Token inválido'
      });
    }

    request.user = user;
    return next();
  } catch (error) {
    return response.status(401).json({
      message: 'Token inválido'
    });
  }
};