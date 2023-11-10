import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY = "secret";

function userVerify(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed missing token",
    });
  }
  console.log("TOKEN", token);
  const tokenWithoutBearer = token.split(" ")[1];

  //VERIFY
  jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({ message: "Authentication failed invalid token" });
    }
    ///atttach the decoded token
    req.user = decoded;

    //cont..

    next();
  });
}
export default userVerify;