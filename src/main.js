import express from 'express';

const main = express();

main.listen(3000, () => {
  console.log('Server is listening on port - 3000');
})