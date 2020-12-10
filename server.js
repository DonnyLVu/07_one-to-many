require('dotenv').config();
const app = require('./lib/utils/app.js');
const port = 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
