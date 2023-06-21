const User = require('../../model/user');
const { validatePassword, genPassword } = require('../../utils/passwordUtils');

module.exports.ProfileEdit = async (req, res, next) => {
    // skipping this till implement the forum and profile system
    // next();

    // TODO: UPLOAD IMAGE AS FILES

    const data = req.body;

    const isValid = validatePassword(data.vrfPassword, req.user.hash, req.user.salt)

    if (!isValid)
        return res.status(404).json({ message: "Unvalid password" })

    delete req.body.vrfPassword

    if (req.body.dob)
        data.dob = new Date(req.body.dob);
    else {
        delete data.dob
    }

    const newData = {};
    const message = ""

    const name = { fName: data.fName, lName: data.lName }
    delete data.fName;
    delete data.lName;
    data.name = name;

    for (const property in data) {
        if (property === 'name' || property === "vrfPassword")
            continue;

        if (data[property] !== req.user[property]) {
            if (property === 'email') {
                newData.confirmedEmail = false;
                message = "email changed you will need to confirm your email"
                SendConfirmationEmail(req.user.id);
            }
            newData[property] = data[property]
        }
    }

    if (data.name.fName !== req.user.name.fName || data.name.lName !== req.user.name.lName) {
        newData.name = data.name
    }

    // email confirmation
    if (newData.email) {
    }

    const result = await User.findByIdAndUpdate(req.user.id, newData);

    const user = {
        id: result.id,
        name: {
            fName: result.name.fName,
            lName: result.name.lName
        },
        username: result.username,
        email: result.email,
        info: result.email,
        profilePic: result.profilePic,
        info: result.info,
        order_history: result.order_history
    }

    res.json({ user: user, message: message })
}