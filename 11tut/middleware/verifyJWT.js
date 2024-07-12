const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  console.log("Authorization header:", authHeader);

  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.sendStatus(403);
    }

    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
