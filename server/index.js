import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import { publicRoutes, userRoutes } from './controllers';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.static('static'));
app.use(bodyParser.json());

app.use(publicRoutes());
// app.use(userRoutes());

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
