import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config() // Load environment variables from .env file

connectDB() // Connect to the database

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // Log HTTP requests in development mode
}

app.use(express.json()) // Middleware to parse JSON request bodies

// API routes
app.use('/api/products', productRoutes) // Product-related routes
app.use('/api/users', userRoutes) // User-related routes
app.use('/api/orders', orderRoutes) // Order-related routes
app.use('/api/upload', uploadRoutes); // File upload routes
app.use('/api/cart', cartRoutes); // Cart-related routes

// PayPal configuration route
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // Serve static files from uploads folder

// Serve frontend static files in production
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')); // Serve React app
});

// Error handling middleware
app.use(notFound) // Handle 404 errors
app.use(errorHandler) // Handle other errors

// Start server
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`.yellow.bold
  )
)
