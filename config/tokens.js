require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function generateToken(payload) {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: "2h" });
  return token;
}
function validateToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { generateToken, validateToken };
