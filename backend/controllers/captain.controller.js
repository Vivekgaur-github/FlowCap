const BlacklistToken = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res, next) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if captain already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain already exists." });
    }

    // Hash password before storing
    const hashedPassword = await captainModel.hashPassword(password);

    // Create captain
    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    // Generate JWT token
    const token = captain.generateAuthToken();
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ token, captain });
  } catch (error) {
    console.error("Error in registerCaptain:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  // Generate new token
  const token = captain.generateAuthToken();

  // Set cookie (optional)
  res.cookie("token", token, { httpOnly: true, secure: false });

  res.status(200).json({ token, captain });
};


module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    if (!req.captain) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
    return res.status(200).json(req.captain);
  } catch (error) {
    console.error("Error in getCaptainProfile:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided." });
    }

    // Blacklist token
    await BlacklistToken.create({ token });

    // Clear cookie
    res.clearCookie("token", { httpOnly: true });

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error in logoutCaptain:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};
