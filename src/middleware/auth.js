import jwt from 'jsonwebtoken';

// eslint-disable-next-line import/prefer-default-export
export const auth = (req, res, next) => {
  const token = req.header('Authentication');

  if (!token) {
    return res.status(401).json({ errorMsg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).json({ errorMsg: 'Token is not valid.' });
  }
};
