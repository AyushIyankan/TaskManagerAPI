const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      status: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    status: false,
    error: `Something went wrong. Please try again later.`,
  });
};

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, statusCode) => {
  return new CustomError(message, statusCode);
};

module.exports = {
  errorHandler,
  CustomError,
  createCustomError,
};
