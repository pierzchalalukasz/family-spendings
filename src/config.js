const createConfig = () => ({
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
  PORT: process.env.PORT,
});

export default createConfig;
