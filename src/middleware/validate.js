import { validate } from 'express-validation';

const validateMiddleware = (schema) => (
  // dependencies
) => validate(schema);

export default validateMiddleware;
