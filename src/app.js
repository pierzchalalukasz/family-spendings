import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import routes from './routes';

import defaultDependencies from './container';
import { handleError } from './utils/error';

dotenv.config();

export { defaultDependencies };

export const init = async (dependencies = defaultDependencies) => {
  const app = express();
  const port = 5000;

  app.use(bodyParser.json());

  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });

  routes.forEach(({
    method, path, controller, middleware,
  }) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    if (!allowedMethods.find((m) => m === method)) {
      throw new Error(`Bad method ${method} used for ${path}`);
    }

    const registeringFn = app[method.toLowerCase()].bind(app);

    const handlers = [...(middleware || []), controller(dependencies)];

    return registeringFn(path, ...handlers);
  });

  app.use((err, req, res, next) => {
    handleError(err, res);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
