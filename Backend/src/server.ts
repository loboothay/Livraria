import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './swagger';
import { DataSource } from 'typeorm';

// Create a new DataSource instance
export const AppDataSource = new DataSource({
    type: "postgres", // or your database type
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "dba",
    password: process.env.DB_PASSWORD || "dba",
    database: process.env.DB_DATABASE || "livrariaDb",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
});
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