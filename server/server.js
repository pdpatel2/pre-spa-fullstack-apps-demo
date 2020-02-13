const app = require('./app');

const {db} = require('./db')

const PORT = 3000;

const init = async () => {
  await db.sync()
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();
