const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(200)
                .json({ message: 'User already exist, Proceed with login', success : false })
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: 'Signup Successfully',
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal Server Error',
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errormessage = 'User name or password is incorrect'
        if (!user) {
            return res.status(200)
                .json({
                    message: errormessage,
                    success: false
                })
        }
        const ispassequal = await bcrypt.compare(password, user.password);
        if (!ispassequal) {
            return res.send(200).
                json({
                    message: errormessage,
                    success: false
                })
        }
        const jwtToken = jwt.sign(
            {email: user.email, _id:user._id},
            process.env.NODE_JWT_SECRET_KEY,
            {expiresIn:'24h'}
        )
        res.status(200)
            .json({
                message: 'Login Success',
                success: true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal Server Error',
                success: false
            })
    }
}

const allData = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(201)
            .json({
                message: 'All Data',
                success: true,
                data: user
            })
    } catch (error) {
        res.status(500)
            .json({
                message: 'Internal Server Error',
                success: false
            })
    }
}

module.exports = {
    signup,
    allData,
    login
}