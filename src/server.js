import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

dotenv.config();

// Get current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the absolute path to the React build folder
const clientBuildPath = path.join('C:\\Users\\juans\\OneDrive\\Escritorio\\API-Stack-MERN\\server\\client\\build');

// Server setup
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, { dbName: "app" })
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });

// Serve static files from the React app
app.use(express.static(clientBuildPath));

// Handle any other routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});
