const {server, mongoose} = require('./server')

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "meralBooks"
}).then(() => {
  console.log("connected to the database");
  server.listen(3000, () => console.log('listening on port 3000'));
}).catch(err => console.log(err));