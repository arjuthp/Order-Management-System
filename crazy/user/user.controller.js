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
    user: { _id: user._id ,name: user.name, email: user.email }
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

async function handleUpdateUser(req,res) {
    const { name, email, password, phone, address} = req.body;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {name, email, password, phone, address},
        {returnDocument: 'after'})
    if(!user){
        return res.status(404).json({error: 'User not found'});
    }
    return res.json({
        message: 'User updated Successfully',
        user
    });
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return res.status(404).json({error: "User not found"});
    }
    return res.json({message: 'User deleted successfully'});
}    


module.exports = {
    handleUserRegister,
    handleUserLogin,
    handleGetUserList,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUserById,
}