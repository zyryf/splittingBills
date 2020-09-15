require("dotenv").config();
const JWT = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.headers.token;

  if (!token) return res.status(401).json({ title: "User unauthorized" });

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ title: "Token is no longer valid" });
    req.decoded = decoded;

    next();
  });
}

module.exports = authToken;
