const {mongoose, server} = require('./server');
const https = require('https');
const fs = require('fs');
const path = require('path');

const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, "key", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "key", "cert.pem")),
}, server)

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "meralBooks"
}).then(() => {
  console.log("connected to the database");
  sslServer.listen(3000, () => console.log('listening on port 3000'));
}).catch(err => console.log(err));