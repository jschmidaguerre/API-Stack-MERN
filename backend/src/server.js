import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
const __dirname = path.resolve();

//server
const app = express();
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017/test';



// middlewares
app.use(cors());
app.use(express.json())
app.use('/', userRoutes);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB y lanzamiento del servidor
mongoose.connect(uri)
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });


app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "..frontend/build/index.html"),
    function(err){
      if (err) {
        res.status(500).send(err);
      }
    }
  )
})


  // After all route handlers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});