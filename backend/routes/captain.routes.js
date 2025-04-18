const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware =require('../middlewares/auth.middleware')

router.post("/register",
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("fullname.firstname").isLength({min:3}).notEmpty().withMessage("Full name is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("vehicle.color").isLength({min:3}).notEmpty().withMessage("Vehicle color is required"),
        body("vehicle.plate").isLength({min:3}).notEmpty().withMessage("Vehicle plate is required"),
        body("vehicle.capacity").isInt({ min: 1 }).withMessage("Vehicle capacity must be a positive integer"),
        body("vehicle.vehicleType").notEmpty().isIn(['car','motorcycle','auto']).withMessage("Vehicle type is required")
    ],
    captainController.registerCaptain
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long')
],
captainController.loginCaptain
)
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
