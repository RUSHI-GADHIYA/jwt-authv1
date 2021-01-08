


var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const user = require('../models/user');


exports.savedata = async (req, res, next) => {



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    var { email, password } = req.body;
    var newUser = new user();
    newUser.email = email;
    newUser.password = hashedPassword;



    newUser.save().then(() => (res.json('added')));
    console.log(newUser);

}

exports.finduser = (req, res) => {

    var id = req.params.id;
    user.findById(id, function (err, data) {
        res.json(data)
    });

}

exports.updateuser = (req, res) => {

    user.findByIdAndUpdate(req.params.id, req.body,
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.json('updated')
            }
        });
}


exports.deleteuser = (req, res) => {
    user.findByIdAndDelete(req.params.id, function (err) {
        if (err) {
            console.log(err);

        }
        else {
            res.json('deleted');
        }
    });
}

exports.homedata = (req, res) => {
    res.send("confidential data")

}

exports.handlelogin = async (req, res) => {

    var { email, password } = req.body;

    const thisuser = await user.findOne({ email: email });
    if (!thisuser) return res.status(400).send('email is not found')

    const validpass = await bcrypt.compare(password, thisuser.password)
    if (!validpass) return res.status(400).send('invalid password');

    const token = jwt.sign({ _id: thisuser._id }, 'top-secret')
    res.header('auth-token', token).send(token);
    console.log('logged in!');

    res.redirect('/user/home');
}





