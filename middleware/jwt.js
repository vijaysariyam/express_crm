const jwt = require("jsonwebtoken");
const fs = require("fs");
const privateKey = fs.readFileSync("private_key.pem");
const publicKey = fs.readFileSync("public_key.pem");

const generateRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  return refreshToken;
};

function requestUserTokens(user) {
  const user = { id };
  const accessToken = jwt.sign(user, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(user, privateKey, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

  return { accessToken, refreshToken };
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const refreshHeader = req.headers["refresh"];
  const refreshtoken = refreshHeader && refreshHeader.split(" ")[1];

  //console.log(token);
  if (token == null || refreshtoken == null)
    return res.status(401).json({ error: "Unauthorized Access" });

  jwt.verify(
    refreshtoken,
    publicKey,
    {
      algorithm: "RS256",
    },
    (error, user) => {
      if (error)
        return res
          .status(403)
          .json({ error: "Unauthorized:Invalid referesh token" });
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
  );
}

module.exports = { requestUserTokens, authenticateToken };
