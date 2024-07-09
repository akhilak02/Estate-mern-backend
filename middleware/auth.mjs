import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
     console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({ succes: false, err_msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
     console.log("Token:", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
      console.log(err);
      if (err) {
        console.error("JWT Verification Error:", err);
        res.json({ succes: false, err_msg: "your login has expired" });
      } else {
        // req.id=decode.id
        next();
      }
    });
  } catch (err) {
    console.log(err);
  }
};
