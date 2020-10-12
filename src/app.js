import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './routes';
import createConfig from './config';

import createContainer from './container';
import { handleError } from './middleware/error';

export const init = async (dependenciesOverride) => {
  const config = createConfig();
  const app = express();
  const port = config.PORT;

  app.use(bodyParser.json());
  app.use(cors());

  const db = await mongoose.connect(config.DB_CONNECTION_STRING, {
    useNewUrlParser: true, useUnifiedTopology: true,
  });

  const dependencies = dependenciesOverride || createContainer(db, config);

  routes.forEach(({
    method, path, controller, middleware,
  }) => {
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    if (!allowedMethods.find((m) => m === method)) {
      throw new Error(`Bad method ${method} used for ${path}`);
    }

    const registeringFn = app[method.toLowerCase()].bind(app);
    const injectDependencies = (handlerCreator) => handlerCreator(dependencies);
    const handlers = [...(middleware || []), controller].map(injectDependencies);

    return registeringFn(path, ...handlers);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    handleError(err, res);
  });

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

export default null;
