const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("private_key.pem");
const publicKey = fs.readFileSync("public_key.pem");

function verifyRefreshToken(refreshToken) {
  const decodedToken = jwt.verify(refreshToken, privateKey, {
    algorithms: ["RS256"],
  });

  return decodedToken;
}

function requestAccessTokens(payload) {
  const userData = payload;
  const accessToken = jwt.sign(userData, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  return accessToken;
}

function requestRefereshTokens(payload) {
  const userData = payload;

  const refreshToken = jwt.sign(userData, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  return refreshToken;
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //console.log(token);
  if (token == null)
    return res.status(401).json({ error: "Unauthorized Access" });

  jwt.verify(
    token,
    publicKey,
    {
      algorithm: "RS256",
    },
    (error, user) => {
      if (error)
        return res
          .status(403)
          .json({ error: "Unauthorized:Invalid auth token" });
      req.user = user;
      next();
    }
  );
}

module.exports = {
  requestRefereshTokens,
  requestAccessTokens,
  authenticateToken,
  verifyRefreshToken,
};
