const User = require("../../model/user");

const Register = async (req, res, next) => {
  const { fName, lName, username, email, password, gender } = req.body;
  const usernameExist = await User.findOne({ username: username });
  if (usernameExist)
      return res.json({ message: "Username Already Taken" });

  const emailExist = await User.findOne({ email: email });
  if (emailExist)
      return res.json({ message: "E-mail Already Taken" });

  if (!fName || !lName || !username || !email || !password || !gender)
      return res.json({ message: "please provide a valid data" });

  const userSecret = genPassword(password);
  const newUser = new User({
      name: {
          fName: fName,
          lName: lName
      },
      username: username,
      email: email,
      gender: gender,
      hash: userSecret.hash,
      salt: userSecret.salt,
      created_at: new Date()
  })

  const result = await newUser.save();

  if (result.errors)
      return res.sendStatus(500);

  SendConfirmationEmail(result.id);
  res.status(201).json({ message: "Please check your email for confirmation" });
}

module.exports.Register = Register;