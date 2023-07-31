// const {S3Client} = require("@aws-sdk/client-s3")

// if(process.env.envirement === 'dev'){

//   module.exports = new S3Client({
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     },
//     region: process.env.AWS_REGION,
//   })
  
// }else{
//   module.exports = S3Client;
// }

const AWS = require('@aws-sdk/client-s3')

if(process.env.ENVIREMENT === 'dev'){

  // module.exports = new S3Client({
  //   credentials: {
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  //   },
  //   region: process.env.AWS_REGION,
  // })
  
  module.exports = new AWS.S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_REGION,
    
  })

}else{
  module.exports = new AWS.S3();;
}


const s3 = new AWS.S3();
