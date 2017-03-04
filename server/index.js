import express from 'express';
import path from 'path';
import api from './api';
import auth from './auth';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('static'));

app.use('/api', api);
app.use('/auth', auth);
app.use('/health', (req, res) => res.status(200).send('ok'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

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
