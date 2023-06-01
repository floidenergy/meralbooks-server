const Logout = (req, res, next) => {
  res.sendStatus(200);
  if (req.user)
      req.logout((err) => {
          if (err)
              console.log(err);
      });
}

module.exports.Logout = Logout;