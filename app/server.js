const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8282;

app.listen(PORT, () => console.log(`App runing in ${PORT} port!`));
