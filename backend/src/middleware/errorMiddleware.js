// Custom error handling middleware
export const errorHandler = (err, req, res, next) => {
  // Log error for server-side tracking
  console.error(`Error: ${err.message}`);
  console.error(err.stack);

  // Determine status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Prepare error response
  const errorResponse = {
    message: err.message || 'An unexpected error occurred',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  };

  // Additional error type handling
  if (err.name === 'ValidationError') {
    // Mongoose validation errors
    errorResponse.message = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');
    errorResponse.type = 'ValidationError';
  }

  if (err.name === 'CastError') {
    // Mongoose cast errors (e.g., invalid ID)
    errorResponse.message = `Invalid ${err.kind}: ${err.value}`;
    errorResponse.type = 'CastError';
  }

  if (err.code === 11000) {
    // Mongoose duplicate key error
    errorResponse.message = 'Duplicate key error. Resource already exists.';
    errorResponse.type = 'DuplicateKeyError';
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Middleware to handle 404 Not Found errors
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
