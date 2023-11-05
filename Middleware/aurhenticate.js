import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = process.env.SECRET_KEY;

function authenticate(req, res, next) {
  const token = req.headrs.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed missing token",
    });
  }
  console.log("TOKEN", token);
  const tokenWithoutBearer = token.split("")(1);

  //VERIFY
  jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ message: "Authentication failed invalid token" });
    }
    ///atttach the decoded token
    req.decoded = decoded;

    //cont..

    next();
  });
}
export default authenticate;