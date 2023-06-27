const { Router } = require("express");

const subMail = require("../model/subMail");

const router = Router();

router.route('/subMail')
  .post(async (req, res, next) => {
    const mailData = req.body.email;

    const isExist = await subMail.findOne({mail: mailData});

    if(isExist)
      return res.sendStatus(200);

    const mail = new subMail({mail: mailData});
    mail.save();
    res.sendStatus(200);
  })
  
module.exports = router