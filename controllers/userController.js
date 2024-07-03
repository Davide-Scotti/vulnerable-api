const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password }); // Vulnerabile a NoSQL Injection
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Login failed');
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.send('User registered');
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id); // Vulnerabile a IDOR
    res.send(user);
};

exports.updatePassword = async (req, res) => {
    const { username, newPassword } = req.body;
    await User.findOneAndUpdate({ username }, { password: newPassword }); // Vulnerabile a CSRF
    res.send('Password updated');
};
