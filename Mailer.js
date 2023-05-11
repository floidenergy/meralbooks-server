require("dotenv").config();
const jwt = require('jsonwebtoken');

const user = {
  name: "med islam",
  id: 120,
  age: 25
}

// const token = jwt.sign({user}, process.env.JWT_TOKEN);

// console.log(token);

const result = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJtZWQgaXNsYW0iLCJpZCI6MTIwLCJhZ2UiOjI1fSwiaWF0IjoxNjgzODEzNDIxfQ.sQNw2vy8HDTe6XkADRA-WFOkXuXU0n0Cr_Rj7oTJnBg",
                process.env.JWT_REFRESH_TOKEN);



console.log(result);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJtZWQgaXNsYW0iLCJpZCI6MTIwLCJhZ2UiOjI1fSwiaWF0IjoxNjgzODEzNDIxfQ.sQNw2vy8HDTe6XkADRA-WFOkXuXU0n0Cr_Rj7oTJnBg