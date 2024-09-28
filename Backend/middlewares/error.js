class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
  
    // Handling duplicate key error in MongoDB
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
      err = new ErrorHandler(message, 400);
    }
  
    // Handling invalid JWT error
    if (err.name === "JsonWebTokenError") {
      const message = "Json Web Token is invalid, Try again!";
      err = new ErrorHandler(message, 400);
    }
  
    // Handling expired JWT error
    if (err.name === "TokenExpiredError") {
      const message = "Json Web Token is expired, Try again!";
      err = new ErrorHandler(message, 400);
    }
  
    // Handling invalid MongoDB ObjectId error
    if (err.name === "CastError") {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
    }
  
    // Extracting error messages from validation errors
    const errorMessage = err.errors
      ? Object.values(err.errors)
          .map((error) => error.message)
          .join(" ")
      : err.message;
  
    return res.status(err.statusCode).json({
      success: false,
      message: errorMessage,
    });
  };
  
  export default ErrorHandler;
  