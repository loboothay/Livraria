import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { BookController } from './controllers/BookController';
import { CategoryController } from './controllers/CategoryController';
import { ReviewController } from './controllers/ReviewController';
import { LoanController } from './controllers/LoanController';
import { authMiddleware } from './middleware/authMiddleware';

const routes = Router();
const userController = new UserController();
const bookController = new BookController();
const categoryController = new CategoryController();
const reviewController = new ReviewController();
const loanController = new LoanController();

// Rota de teste para verificar se a API está funcionando
routes.get('/health', (_, res) => {
  return res.json({ message: 'API está funcionando!' });
});

// Rotas de usuários
routes.post('/users/register', userController.register.bind(userController));
routes.post('/users/login', userController.login.bind(userController));
routes.get('/users/profile', authMiddleware, userController.profile.bind(userController));
routes.put('/users/profile', authMiddleware, userController.update.bind(userController));
routes.delete('/users/profile', authMiddleware, userController.delete.bind(userController));
routes.post('/users/favorites', authMiddleware, userController.addFavoriteBook.bind(userController));
routes.delete('/users/favorites/:bookId', authMiddleware, userController.removeFavoriteBook.bind(userController));

// Rotas de categorias
routes.post('/categories', authMiddleware, categoryController.create.bind(categoryController));
routes.get('/categories', categoryController.list.bind(categoryController));
routes.get('/categories/:id', categoryController.getOne.bind(categoryController));
routes.put('/categories/:id', authMiddleware, categoryController.update.bind(categoryController));
routes.delete('/categories/:id', authMiddleware, categoryController.delete.bind(categoryController));

// Rotas de livros
routes.post('/books', authMiddleware, bookController.create.bind(bookController));
routes.get('/books', bookController.list.bind(bookController));
routes.get('/books/:id', bookController.getOne.bind(bookController));
routes.put('/books/:id', authMiddleware, bookController.update.bind(bookController));
routes.delete('/books/:id', authMiddleware, bookController.delete.bind(bookController));

// Rotas de avaliações
routes.post('/reviews', authMiddleware, reviewController.create.bind(reviewController));
routes.get('/reviews', reviewController.list.bind(reviewController));
routes.get('/reviews/user', authMiddleware, reviewController.getUserReviews.bind(reviewController));
routes.put('/reviews/:id', authMiddleware, reviewController.update.bind(reviewController));
routes.delete('/reviews/:id', authMiddleware, reviewController.delete.bind(reviewController));

// Rotas de empréstimos
routes.post('/loans', authMiddleware, loanController.create.bind(loanController));
routes.get('/loans', authMiddleware, loanController.list.bind(loanController));
routes.get('/loans/:id', authMiddleware, loanController.getOne.bind(loanController));
routes.patch('/loans/:id', authMiddleware, loanController.return.bind(loanController));

export { routes };