// backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    // Log the error stack to the console
    console.error(err.stack);

    // Set the status code; default to 500 if not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Send a JSON response with the error message
    res.json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Include stack trace only in development mode
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
