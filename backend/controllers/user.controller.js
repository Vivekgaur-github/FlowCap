const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require("express-validator");
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.registerUser = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()[0].msg,
                errors: errors.array()
            });
        }

        const { fullname, email, password } = req.body;

        if (!fullname?.firstname || !email || !password) {
            return res.status(400).json({ 
                message: "First name, email and password are required" 
            });
        }
        
        // Check if user already exists
        const isUserAlreadyExist = await userModel.findOne({ email });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });
        
        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;
        
        const token = user.generateAuthToken();
        res.status(201).json({
            token,
            user: userResponse,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.loginUser= async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json ({error: errors.array()});
    }
    const{email,password}=req.body;

    const user= await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({Message: 'Invalid email or password'});
    }
    const isMatch= await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({Message: 'Invalid email or password'});
    }
    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,user}); 
}

module.exports.getUserprofile =async (req,res,next)=>{
    res.status(200).json(req.user);


}

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');

        // Get token from request
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Save token to blacklist
        await BlacklistToken.create({ token });

        res.status(200).json({ message: 'Logged Out' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
