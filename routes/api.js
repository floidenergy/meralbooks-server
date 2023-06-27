const { Router } = require('express')
const Getters = require('./api/v1/Getters');

const router = Router();

router.route("/")
  .get((req, res) => {
    console.log("requested to api/v1");
    res.send("Welcome to meralbooks api 📖📚❤️");
  })

router.use("/v1", Getters)

module.exports = router;