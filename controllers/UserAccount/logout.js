const Logout = (req, res, next) => {

    if (req.user)

        req.logout((err) => {
            if (err){
                console.log("**Logout function**");
                console.log(err);
            }
        });
    res.sendStatus(200);
}

module.exports.Logout = Logout;