class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  const code = statusCode || 500;
  res.status(code).json({
    status: 'error',
    code,
    message: message || 'Internal server error',
  });
};
export {
  ErrorHandler,
  handleError,
};
