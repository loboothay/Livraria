import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: CustomError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  console.error(error);

  // Se o erro tiver um código de status definido, use-o; caso contrário, use 500
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';

  return response.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};