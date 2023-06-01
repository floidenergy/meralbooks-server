const jwt = require("jsonwebtoken");
const User = require("../../model/user");

module.exports.emailConfirmation = async (req, res, next) => {
    const token = req.body.token;
    try {
        const reqUser = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: reqUser.id });

        if (user.confirmedEmail){
            return res.status(403).json({message: "Email Already verified"});
        }

        if (user.privacyToken.includes(token)) {
            console.log("token already exist");
            throw new Error("Your Link has Expired Please Login To Request A New Link.");
        }

        await User.findByIdAndUpdate(user.id, { confirmedEmail: true, privacyToken: [...user.privacyToken, token] });

        res.status(200).json({ message: "You Successfuly Confirmed Your Email." });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: "Your Link has Expired Please Login To Request A New Link." });
    }
}