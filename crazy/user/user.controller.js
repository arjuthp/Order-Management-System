const User = require('./user.model');


async function handleUserRegister(req, res)  {
 const {name, email, password} = req.body;
 await User.create ({
    name,
    email,
    password,
 });
 return res.json({ message: 'User registered successfully' });

};

async function handleUserLogin(req, res) {
    const { email, password} = req.body;
    const user = await User.findOne({
        email, password,
    });
   if(!user) return res.status(401).json({
    error: "Invalid Username or Password",
})
return res.json({
    message: "Login successful",
    user: { name: user.name, email: user.email }
});    

}

async function handleGetUserList(req, res) {
    const users = await User.find({});
    return res.json(users);
}

async function handleGetUserById(req, res) {
    const userId = await User.findById(req.params.id);
    return res.json(userId);
}

module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleGetUserList,
    handleGetUserById,
}