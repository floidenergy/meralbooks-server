const { Router } = require('express')
const Getters = require('./api/v1/Getters');

const router = Router();

router.route("/")
  .get((req, res) => {
    res.status(200).send("Welcome to meralbooks api 📖📚❤️");
  })

router.use("/v1", Getters)

module.exports = router;