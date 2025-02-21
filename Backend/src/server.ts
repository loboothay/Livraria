import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import { AppDataSource } from './data-source';
import { errorHandler } from './middleware/errorHandler';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

// Swagger documentation as root route
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument));

// Swagger documentation alternative route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  console.log('Database connected successfully');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to database:', error);
});