const mongoose = require('mongoose');
const app = require('./app');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const port = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
