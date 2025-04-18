const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

const extractToken = (req) => {
  try {
    return (
      req.cookies.token ||
      (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null)
    );
  } catch (error) {
    return null;
  }
};

module.exports.authUser = async (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AuthUser Error:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const isBlacklisted = await blackListTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized: Token blacklisted" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await captainModel.findById(decoded._id);

    if (!req.captain) {
      return res.status(401).json({ message: "Unauthorized: Captain not found" });
    }

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};
