

const Login = (req, res, next) => {
  const user = {
      id: req.user.id,
      name: {
          fName: req.user.name.fName,
          lName: req.user.name.lName
      },
      username: req.user.username,
      email: req.user.email,
      info: req.user.email,
      // profilePic: req.user.profilePic,
      info: req.user.info,
      order_history: req.user.order_history
  }

  res.status(200).json(user);
}

module.exports.Login = Login;